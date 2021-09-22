<template>
	<view class="content">
		<image class="logo" src="/static/logo.jpg"></image>
		<button type="default" @click="setAccessExp">设置accessToken 过期</button>
		<button type="default" @click="globalGetData">发起请求</button>
		<navigator url="/pages/concurrent/concurrent"><button type="default">进入同时发起多个请求的页面</button></navigator>
		<navigator url="/pages/concurrent2/concurrent2"><button type="default">进入同时发起多个请求的页面，response 拦截器获取新的accessToken</button></navigator>
		<view class="nav-list">
			luch-request:
			<a href="https://www.quanzhan.co/luch-request/" target="_blank">luch-request官网</a>
		</view>
		<view class="nav-list">
			更多信息：
			<a href="https://www.quanzhan.co/archives/51" target="_blank">更多信息</a>
		</view>
		<view class="nav-list">
			我的博客：
			<a href="https://www.quanzhan.co/" target="_blank">luch的博客</a>
		</view>
		<view class="footer-text">本示例项目属于付费项目，请勿开源</view>
	</view>
</template>

<script>
import userMessage from '@/store/userMessage.js';
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {
		/**
		 * 全局引入的方式获取数据
		 */
		globalGetData() {
			// let id = Math.random() > 0.5 ? Date.now() : undefined
			let id = 3443434;
			this.$http
				.post(
					'/api/user/update',
					{ id: id },
					{
						custom: { auth: true },
						params: {
							username: 'luch',
							email: Date.now() + '-------webwork.s@qq.com',
							address: Date.now() + '-------https://quanzhan.co'
						}
					}
				)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 设置access token 过期
		setAccessExp() {
			console.log(`你已经把${userMessage.state.accessToken}这个accessToken 设置为过期，下次请求会刷新accessToken`);
			userMessage.setTokenExpiresTime(Date.now());
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
}

.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}

.title {
	font-size: 36upx;
	color: #8f8f94;
}
.footer-text {
	padding-top: 30rpx;
	color: red;
	text-align: center;
}
.nav-list {
	padding-top: 15rpx;
}
</style>
