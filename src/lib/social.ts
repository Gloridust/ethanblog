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

    // 使用 localStorage 存储最后一次成功获取的粉丝数
    let lastKnownFollowers: number | null = null
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lastKnownTwitterFollowers')
      if (stored) {
        try {
          const data = JSON.parse(stored)
          if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) { // 24小时内的数据
            lastKnownFollowers = data.value
          }
        } catch (e) {
          console.error('Error parsing stored followers count')
        }
      }
    }

    // 如果有最后已知的粉丝数就使用它，否则返回 1500
    return lastKnownFollowers || 1500
  }
}

export async function getSocialStats() {
  console.log('开始获取社交媒体统计数据...')
  
  const stats = {
    twitter: '0',
    xiaohongshu: '0'
  }

  try {
    const twitterCount = await getTwitterFollowers('Gloridust1024')
    console.log('最终获取到的 Twitter 粉丝数:', twitterCount)
    
    // 如果成功获取到数据，存储到 localStorage
    if (typeof window !== 'undefined' && twitterCount > 0) {
      localStorage.setItem('lastKnownTwitterFollowers', JSON.stringify({
        value: twitterCount,
        timestamp: Date.now()
      }))
    }
    
    stats.twitter = formatFollowers(twitterCount)
    stats.xiaohongshu = formatFollowers(90)
  } catch (error) {
    console.error('获取社交统计数据时发生错误:', error)
    
    if (twitterFollowersCache) {
      stats.twitter = formatFollowers(twitterFollowersCache.value)
    } else {
      // 尝试从 localStorage 获取最后已知的粉丝数
      let lastKnownFollowers = 1500 // 默认值改为 1500
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('lastKnownTwitterFollowers')
        if (stored) {
          try {
            const data = JSON.parse(stored)
            if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
              lastKnownFollowers = data.value
            }
          } catch (e) {
            console.error('Error parsing stored followers count')
          }
        }
      }
      stats.twitter = formatFollowers(lastKnownFollowers)
    }
  }

  console.log('返回的统计数据:', stats)
  return stats
} 