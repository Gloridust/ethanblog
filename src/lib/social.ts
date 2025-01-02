import axios from 'axios'

const SUBSTATS_API = 'https://api.swo.moe/stats'

function formatFollowers(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}

export async function getSocialStats() {
  const stats = {
    twitter: '0',
    xiaohongshu: '0'
  }

  try {
    // 获取 Twitter 粉丝数
    const twitterResponse = await axios.get(`${SUBSTATS_API}/twitter/Gloridust1024`)
    const twitterCount = twitterResponse.data?.count || 1314
    stats.twitter = formatFollowers(twitterCount)

    // 获取小红书粉丝数
    stats.xiaohongshu = formatFollowers(78) // 暂时写死一个数字，因为小红书API限制

  } catch (error) {
    console.error('Error fetching social stats:', error)
  }

  return stats
} 