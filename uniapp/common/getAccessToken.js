import Request from '@/utils/luch-request/index.js'
import {
	baseApiFull
} from '@/common/config.js'
import userMessage from '@/store/userMessage.js'
import {
	tokenExpMilli
} from '@/common/mockVariable.js'
const refreshRequest = new Request()
refreshRequest.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = baseApiFull /* 根域名不同 */
	return config
})

let lock = false
let promiseResult = []
export function getAccessToken() {
	return new Promise((resolve, reject) => {
		promiseResult.push({
			resolve,
			reject
		})
		if (!lock) {
			lock = true
			refreshRequest.post('/api/get/accesstoken', {
				status: 'success', // 正式情况下不需要传这个，我这里为了模拟请求accesstoken的状态
				refreshToken: userMessage.state.refreshToken,
				expiresTime: tokenExpMilli // 正式情况下不需要传这个，我这里为了模拟{tokenExpMilli}毫秒后accessToken过期
			}).then(res => {
				let {code, data} = res.data
				if (code === 200) {
					userMessage.setTokenExpiresTime(data.expiresTime) // 更新accessToken过期时间
					userMessage.setAccessToken(data.accessToken) // 更新accessToken
				}
				while (promiseResult.length) {
					// p1.resolve(res.data)
					promiseResult.shift().resolve(res.data)
				}
				lock = false
			}).catch(err => {
				while (promiseResult.length) {
					// p1.reject(err)
					promiseResult.shift().reject(err)
				}
				lock = false
			})
		}
	})
}
