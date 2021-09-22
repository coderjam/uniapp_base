<template>
	<view>
		用户信息
		<br />
		用户名: {{ userMessageState.message.nickname }}
		<br />
		用户年龄: {{ userMessageState.message.age }}
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		{{ userMessageState.message }}
		<button type="default" @click="loginOut">退出登录</button>
	</view>
</template>

<script>
import { updateUserInfo } from '@/utils/user.js';
import userMessage from '@/store/userMessage.js';
export default {
	data() {
		return {
			userMessageState: userMessage.state
		};
	},
	onShow() {
		if (userMessage.state.loginStatus) {
			updateUserInfo();
		}
	},
	methods: {
		// 退出登录
		loginOut() {
			userMessage.clearMessageSync();
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}
	}
};
</script>

<style lang="scss"></style>
