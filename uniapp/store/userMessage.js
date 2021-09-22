import {
	USERINFO,
	ACCESS_TOKEN,
	REFRESH_TOKEN,
	TOKEN_EXP_TIME
} from '@/common/storageTypes.js'

let initMes = {}
let loginStatus = false
let initAccessToken = ''
let initRefreshToken = ''
let expTime = 0
try {
	let mes = uni.getStorageSync(USERINFO)
	let token = uni.getStorageSync(ACCESS_TOKEN)
	let refToken = uni.getStorageSync(REFRESH_TOKEN)
	let expTime = uni.getStorageSync(TOKEN_EXP_TIME)
	// 如果
	if (mes && token && refToken) {
		initMes = mes
		loginStatus = true
		initAccessToken = token
		initRefreshToken = refToken
	}
} catch (e) {
console.log(e);
}
export default {
	debug: false,
	state: {
		message: initMes,
		loginStatus: loginStatus, // 是否登录
		accessToken: initAccessToken,
		refreshToken: initRefreshToken,
		expiresTime: expTime, // token 过期时间
		
	},
	/**
	 *
	 * @param { Object } newValue - 要储存的用户信息
	 * @param {String} newValue.phone - 手机号
	 * @param {String} newValue.guid - 用户标识
	 * @param {String} newValue.nickName - 用户昵称
	 * @param {String} newValue.token - 用户token
	 * @param {String} newValue.headPortrait - 用户头像
	 */
	setMessageSync(newValue) {
		console.log('store 设置新的用户信息');
		uni.setStorageSync(USERINFO, newValue)
		console.log(newValue)
		this.state.message = newValue
	},
	/**
	 * @param {Number} time - 13 位时间戳
	 */
	setTokenExpiresTime(time) {
		uni.setStorageSync(TOKEN_EXP_TIME, time)
		console.log(time)
		this.state.expiresTime = time
	},
	/**
	 * 设置refresh-token
	 * @param {String} n - 新的token
	 */
	setRefreshToken(n) {
		this.state.loginStatus = true
		uni.setStorageSync(REFRESH_TOKEN, n)
		console.log(n)
		this.state.refreshToken = n
	},
	/**
	 * 设置access-token
	 * @param {String} n - 新的token
	 */
	setAccessToken(n) {
		uni.setStorageSync(ACCESS_TOKEN, n)
		console.log(n)
		this.state.accessToken = n
	},
	/**
	 * 更新用户信息，如果存在键值，则更新，否则添加 同步
	 * @param { Object } obj - 要更新的键值
	 */
	updateMessageSync(obj) {
		let state = {
			...this.state.message
		}
		if (typeof obj === 'object' && !Array.isArray(obj)) {
			state = {
				...state,
				...obj
			}
			this.setMessageSync(state)
		}
	},
	/**
	 * 更新用户信息，如果存在键值，则更新，否则添加 异步
	 * @param { Object } obj - 要更新的键值
	 */
	async updateMessage(obj) {
		// obj 如果存在键值，则更新，否则添加 异步
		let state = {
			...this.state.message
		}
		if (typeof obj === 'object' && !Array.isArray(obj)) {
			state = {
				...state,
				...obj
			}
			this.setMessageSync(state)
		}
	},
	/**
	 * 清除储存的用户信息 同步
	 */
	clearMessageSync() {
		// uni.removeStorageSync(USERINFO)
		uni.removeStorage({
			key: USERINFO
		})
		uni.removeStorage({
			key: TOKEN_EXP_TIME
		})
		uni.removeStorage({
			key: ACCESS_TOKEN
		})
		uni.removeStorage({
			key: REFRESH_TOKEN
		})

		this.state.message = {}
		this.state.loginStatus = false
		this.state.accessToken = ''
		this.state.refreshToken = ''
		this.state.expiresTime = 0
	}
}
