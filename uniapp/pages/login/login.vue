<template>
	<view><button type="default" @click="userLogin">点击登录</button></view>
</template>

<script>
import userMessage from '@/store/userMessage.js'
import { tokenExpMilli } from '@/common/mockVariable.js'
import {formatLoginMes} from '@/utils/user.js'
export default {
	data() {
		return {}
	},
	methods: {
		userLogin() {
			this.$http
				.post('/api/user/login', {
					expiresTime: tokenExpMilli // 这里把access token 过期时间传过去。模拟用，正式开发中没有这个
				}, {custom: {auth: false}})
				.then(res => {
					console.log(res)
					let {code, data, desc} = res.data
					if(code === 200) {
						// 正常情况下为了避免后端修改字段导致的大变动，前端会把数据format一下。这样后期改字段只需改一个地方就行了。
						// let formatUser = {
						// 	name: data.user.name,
						// 	age: data.user.age
						// 	// age: data.user.newAgeFileds
						// }
						userMessage.setMessageSync(formatLoginMes(data.user))
						userMessage.setTokenExpiresTime(data.expiresTime)
						userMessage.setRefreshToken(data.refreshToken)
						userMessage.setAccessToken(data.accessToken)
						uni.showToast({
							icon: 'success',
							title: '登录成功！'
						})
						uni.reLaunch({
							url: '/pages/index/index'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: desc
						})
					}
				})
				.catch(err => {})
		}
	}
}
</script>

<style lang="scss"></style>
