import axios from 'axios'

const TWITTER_API_URL = 'https://api.twitter.com/2/users/by/username'
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN
const IS_PRODUCTION = process.env.VERCEL_ENV === 'production'

// 缓存结构
interface CacheData {
  value: number
  timestamp: number
}

// 内存缓存
let twitterFollowersCache: CacheData | null = null
const CACHE_DURATION = 1000 * 60 * 15 // 15分钟缓存

function formatFollowers(count: number): string {
  // 使用 toLocaleString 来格式化数字，添加千位分隔符
  return count.toLocaleString()
}

async function getTwitterFollowers(username: string): Promise<number> {
  try {
    // 检查缓存
    const now = Date.now()
    if (twitterFollowersCache && (now - twitterFollowersCache.timestamp < CACHE_DURATION)) {
      return twitterFollowersCache.value
    }

    if (!TWITTER_BEARER_TOKEN) {
      throw new Error('Twitter Bearer Token not configured')
    }

    const response = await axios({
      method: 'get',
      url: `${TWITTER_API_URL}/${username}`,
      headers: {
        'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
        'Accept': 'application/json'
      },
      params: {
        'user.fields': 'public_metrics'
      },
      timeout: 8000, // 增加超时时间到 8 秒
      validateStatus: (status) => status === 200
    })

    if (response.data?.data?.public_metrics?.followers_count !== undefined) {
      const followersCount = response.data.data.public_metrics.followers_count
      
      // 更新缓存
      twitterFollowersCache = {
        value: followersCount,
        timestamp: now
      }
      
      return followersCount
    }

    throw new Error('Invalid response format')

  } catch (error) {
    // 如果有缓存，在出错时使用缓存
    if (twitterFollowersCache?.value !== undefined) {
      return twitterFollowersCache.value
    }

    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const rateLimitReset = error.response?.headers?.['x-rate-limit-reset']
      
      if (status === 429) {
        console.error('Rate limit exceeded')
      } else if (status === 401) {
        console.error('Authentication error - check Bearer Token')
      } else if (status === 404) {
        console.error('User not found')
      } else {
        console.error(`API error: ${status}`)
      }
    }

    // 在生产环境中返回上一次已知的粉丝数
    return IS_PRODUCTION ? 1467 : 1480
  }
}

export async function getSocialStats() {
  console.log('开始获取社交媒体统计数据...')
  
  const stats = {
    twitter: '0',
    xiaohongshu: '0'
  }

  try {
    // 获取 Twitter 粉丝数
    const twitterCount = await getTwitterFollowers('Gloridust1024')
    console.log('最终获取到的 Twitter 粉丝数:', twitterCount)
    stats.twitter = formatFollowers(twitterCount)

    // 获取小红书粉丝数
    stats.xiaohongshu = formatFollowers(90) // 暂时写死一个数字，因为小红书API限制

  } catch (error) {
    console.error('获取社交统计数据时发生错误:', error)
    
    // 如果有缓存，使用缓存值
    if (twitterFollowersCache) {
      stats.twitter = formatFollowers(twitterFollowersCache.value)
    } else {
      stats.twitter = formatFollowers(IS_PRODUCTION ? 1467 : 1480)
    }
  }

  console.log('返回的统计数据:', stats)
  return stats
} 