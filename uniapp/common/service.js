/**
 * @version 3.0.4
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-2.7.14 alpha-2.8.0
 */
import Request from '@/utils/luch-request/index.js'
import userMessage from '@/store/userMessage.js'
import {
	baseApiFull
} from '@/common/config.js'
import {
	getAccessToken
} from '@/common/getAccessToken.js'
import {
	ACCESS_TOKEN_EXP,
	REFRESH_TOKEN_EXP
} from '@/common/code.js'
import {
	debounce,
	openSystemSettings
} from '@/utils/myUtils.js'
import {
	RESPONSE_TEST
} from '@/common/storageTypes.js'
let expireTokenCache = [] // 储存过期的token
const ACCESS_TOKEN_FILEDS = 'accessToken' // header 里传accessToken的键名
const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = baseApiFull /* 根域名不同 */
	config.custom = {
		auth: true // 是否传递accesstoken
	}
	return config
})



http.interceptors.request.use(async (config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	config.header = {
		...config.header,
	}
	if (config.custom.auth) {
		// 必须在这里就先赋值，避免accessToken 等于undefined 的情况
		config.header[ACCESS_TOKEN_FILEDS] = userMessage.state.accessToken
		// 请确保refreshToken存在。refreshToken不存在的情况自行处理
		if (!userMessage.state.accessToken || Date.now() > userMessage.state.expiresTime) {
			
			// responseTest !== true：这里为了模拟reponse 拦截获取新的accessToken。正常情况下没有这个判断
			let responseTest = uni.getStorageSync(RESPONSE_TEST)
			console.log(responseTest);
			if (responseTest !== true) { // 关闭requet 拦截重新获取accesstoekn 功能。模拟用。
				console.log('全局拦截器 request：accessToken 过期或不存在，调起重新获取');
				try {
					const {
						data,
						code
					} = await getAccessToken()
					console.log('全局拦截器 request：重新获取accessToken后code');
					console.log(code);
					console.log('全局拦截器 request：重新获取accessToken后data');
					console.log(data);
					if (code === 200) {
						expireTokenCache = []
						config.header[ACCESS_TOKEN_FILEDS] = data.accessToken
					} else {
						// 其他情况，可能refreshToken过期了等等，请根据自身逻辑处理
					}
				} catch (e) {
					console.log(e);
					// 可能由于网络原因通过refreshToken 获取accessToken失败了;可以根据自身逻辑处理，我这里直接放弃本次请求，会进入interceptors.response的错误拦截函数
					return Promise.reject(config)
				}
			}
		}
	}
 
	return config
}, (config) => {
	return Promise.reject(config)
})

/**
 * 这里我使用了自己的debounce函数，实际项目中我推荐使用loadsh 的debounce函数。当然使用自己debounce函数也没什么问题
 */
const reLaunchLogin = debounce(function(mes) {
	console.log('全局拦截,重新登录');
	userMessage.clearMessageSync()
	uni.showToast({
		icon: 'none',
		title: mes,
		duration: 2100
	})
	uni.reLaunch({
		url: '/pages/login/login'
	})
}, 1000, true)
const requestInterResErr = debounce(function() {
	uni.getNetworkType({
		success: (netRes) => {
			if (netRes.networkType == "none") {
				uni.showModal({
					title: '提示',
					content: '暂无网络,是否去设置?',
					confirmText: '去设置',
					success(modalRes) {
						if (modalRes.confirm) {
							/**
							 * iOS App第一次安装启动后，会弹出是否允许联网的询问框，在用户点击同意前，调用联网API会失败
							 */
							openSystemSettings();
						}
					}
				})
			}
		}
	});
}, 3000, true)

/**
 * 避免进入死循环，重新new一个用于重新发起请求的实例
 */
const againHttp = new Request({
	baseURL: baseApiFull
})

againHttp.interceptors.request.use(config => {
	config.header[ACCESS_TOKEN_FILEDS] = userMessage.state.accessToken
	return config
}, error => {
	return Promise.reject(error)
})

// 必须使用异步函数，注意
http.interceptors.response.use(async (response) => { /* 请求之后拦截器。*/
	const serviceCode = response.data.code // 服务端code

	if (serviceCode === ACCESS_TOKEN_EXP) {
		// accessToken 过期了。
		let accessToken = response.config.header[ACCESS_TOKEN_FILEDS]
		expireTokenCache.push(accessToken)
		// 说明本地的accessToken已经过期了. 
		// typeof accessToken === 'undefined' 是说明这个接口需要传{ACCESS_TOKEN_FILEDS}但是你却没有传。会重新传入发起请求
		if (expireTokenCache.includes(userMessage.state.accessToken)) {
			try {
				const {
					data,
					code
				} = await getAccessToken()
				console.log('全局拦截器 response：重新获取accessToken后code');
				console.log(code);
				console.log('全局拦截器 response：重新获取accessToken后data');
				console.log(data);
				if (code === 200) {
					// return Promise.resolve(againHttp.middleware(response.config))
					try {
						const localResponse = await againHttp.middleware(response.config)
						return localResponse
					} catch (e) {
						// 重新获取数据可能因为网络原因获取失败了
						return Promise.reject(e)
					}
				} else {
					// 其他情况，可能refreshToken过期了等等，请根据自身逻辑处理
				}
			} catch (e) {
				console.log(e);
				// 可能由于网络原因通过refreshToken 获取accessToken失败了;可以根据自身逻辑处理，我这里直接放弃本次请求，会进入catch
				return Promise.reject(response)
			}
		} else {
			// 本地的accessToken就是新的，重新发起请求
			console.log('本地的accessToken就是新的，重新发起请求');
			try {
				const localResponse = await againHttp.middleware(response.config)
				return response
			} catch (e) {
				// 重新获取数据可能因为网络原因获取失败了
				return Promise.reject(e)
			}
		}

	} else if (serviceCode === REFRESH_TOKEN_EXP) {
		// refreshToken 过期了
		reLaunchLogin('请重新登录！')
	}
	console.log(serviceCode);
	return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	console.log(response)
	requestInterResErr()
	return Promise.reject(response)
})

export {
	http
}
