import axios from 'axios'
import * as cheerio from 'cheerio'

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
let xiaohongshuFollowersCache: CacheData | null = null
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

// 将数字文本转换为整数
function convertNumberText(text: string): number {
  try {
    // 移除空白字符
    text = text.trim();
    
    // 处理带"万"或"w"的数字
    if (text.includes('万') || text.includes('w')) {
      text = text.replace('万', '').replace('w', '');
      return Math.round(parseFloat(text) * 10000);
    }
    
    // 处理普通数字
    return Math.round(parseFloat(text));
  } catch (error) {
    console.error(`无法将文本转换为数字: ${text}`, error);
    return 0;
  }
}

async function getXiaohongshuFollowers(userId: string): Promise<number> {
  try {
    // 检查缓存
    const now = Date.now();
    if (xiaohongshuFollowersCache && (now - xiaohongshuFollowersCache.timestamp < CACHE_DURATION)) {
      return xiaohongshuFollowersCache.value;
    }

    // 如果不在生产环境，返回默认值以避免开发环境中的频繁请求
    if (!IS_PRODUCTION) {
      return 140; // 开发环境返回默认值
    }

    const url = `https://www.xiaohongshu.com/user/profile/${userId}`;
    console.log(`开始请求小红书页面: ${url}`);

    const response = await axios({
      method: 'get',
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
      },
      timeout: 15000, // 15秒超时
      validateStatus: (status) => status === 200
    });

    console.log(`请求成功，状态码: ${response.status}`);
    
    // 使用cheerio解析HTML
    const $ = cheerio.load(response.data);
    let fansCount = 0;
    
    // 尝试多种选择器找粉丝数
    const possibleSelectors = [
      // 常见的粉丝数选择器
      'span:contains("粉丝")',
      'div:contains("粉丝")',
      '.count .num',
      '.follower-count',
      '.user-stats .follower-count',
      '.user-data .data'
    ];
    
    for (const selector of possibleSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        // 查找粉丝数文本
        elements.each((_, el) => {
          const element = $(el);
          // 如果元素包含"粉丝"字样，查找前面的数字
          if (element.text().includes('粉丝')) {
            // 尝试在前一个兄弟元素中找数字
            const prevSibling = element.prev();
            if (prevSibling.length && /\d/.test(prevSibling.text())) {
              fansCount = convertNumberText(prevSibling.text());
              console.log(`找到粉丝数: ${fansCount}`);
              return false; // 退出循环
            }
            
            // 或者尝试正则从当前元素文本提取数字
            const match = element.text().match(/(\d+(?:\.\d+)?(?:万|w)?)\s*粉丝/);
            if (match) {
              fansCount = convertNumberText(match[1]);
              console.log(`从文本中提取粉丝数: ${fansCount}`);
              return false; // 退出循环
            }
          }
        });
        
        if (fansCount > 0) break; // 如果找到了粉丝数，退出选择器循环
      }
    }
    
    // 如果通过选择器没找到，尝试正则表达式
    if (fansCount === 0) {
      console.log('通过选择器未找到粉丝数，尝试正则表达式');
      const html = response.data;
      
      const fansPatterns = [
        /<span[^>]*>(\d+(?:\.\d+)?(?:万|w)?)<\/span>\s*<span[^>]*>[^<]*粉丝[^<]*<\/span>/,
        /<div[^>]*>(\d+(?:\.\d+)?(?:万|w)?)<\/div>\s*<div[^>]*>[^<]*粉丝[^<]*<\/div>/,
        /follower(?:s|Count|Num|_count)["']\s*:\s*(\d+)/i,
        /fans(?:Count|Num|_count)["']\s*:\s*(\d+)/i,
        /(\d+(?:\.\d+)?(?:万|w)?)[^<]{0,20}粉丝/
      ];
      
      for (const pattern of fansPatterns) {
        const match = html.match(pattern);
        if (match) {
          fansCount = convertNumberText(match[1]);
          console.log(`通过正则找到粉丝数: ${fansCount}`);
          break;
        }
      }
    }
    
    // 如果找到了粉丝数，更新缓存
    if (fansCount > 0) {
      xiaohongshuFollowersCache = {
        value: fansCount,
        timestamp: now
      };
      
      // 存储到localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastKnownXiaohongshuFollowers', JSON.stringify({
          value: fansCount,
          timestamp: now
        }));
      }
      
      return fansCount;
    }
    
    throw new Error('未能找到粉丝数');
    
  } catch (error) {
    console.error('获取小红书粉丝数失败:', error);
    
    // 如果有缓存，使用缓存
    if (xiaohongshuFollowersCache?.value) {
      return xiaohongshuFollowersCache.value;
    }
    
    // 尝试从localStorage获取
    let lastKnownFollowers = 101; // 默认值
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lastKnownXiaohongshuFollowers');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
            lastKnownFollowers = data.value;
          }
        } catch (e) {
          console.error('解析存储的小红书粉丝数出错');
        }
      }
    }
    
    return lastKnownFollowers;
  }
}

export async function getSocialStats() {
  console.log('开始获取社交媒体统计数据...')
  
  const stats = {
    twitter: '0',
    xiaohongshu: '0'
  }

  try {
    // 获取Twitter粉丝数
    const twitterCount = await getTwitterFollowers('Gloridust1024')
    console.log('获取到的 Twitter 粉丝数:', twitterCount)
    
    // 如果成功获取到数据，存储到 localStorage
    if (typeof window !== 'undefined' && twitterCount > 0) {
      localStorage.setItem('lastKnownTwitterFollowers', JSON.stringify({
        value: twitterCount,
        timestamp: Date.now()
      }))
    }
    
    stats.twitter = formatFollowers(twitterCount)
    
    // 获取小红书粉丝数
    const xiaohongshuId = '5f1d89a6000000000100ba01' // 使用实际的用户ID
    const xiaohongshuCount = await getXiaohongshuFollowers(xiaohongshuId)
    console.log('获取到的小红书粉丝数:', xiaohongshuCount)
    
    stats.xiaohongshu = formatFollowers(xiaohongshuCount)
  } catch (error) {
    console.error('获取社交统计数据时发生错误:', error)
    
    // Twitter数据恢复
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
    
    // 小红书数据恢复
    if (xiaohongshuFollowersCache) {
      stats.xiaohongshu = formatFollowers(xiaohongshuFollowersCache.value)
    } else {
      let lastKnownFollowers = 101 // 默认值
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('lastKnownXiaohongshuFollowers')
        if (stored) {
          try {
            const data = JSON.parse(stored)
            if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
              lastKnownFollowers = data.value
            }
          } catch (e) {
            console.error('Error parsing stored xiaohongshu followers count')
          }
        }
      }
      stats.xiaohongshu = formatFollowers(lastKnownFollowers)
    }
  }

  console.log('返回的统计数据:', stats)
  return stats
} 