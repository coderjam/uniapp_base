<template>
	<view>
		进入页面会关闭request 拦截获取新的accessToken,使用reponse 拦截获取新的accessToken
		<br>
		离开页面会打开request 拦截获取新的accessToken
	</view>
</template>

<script>
import { ACCESS_TOKEN_EXP } from '@/common/code.js';
import { RESPONSE_TEST } from '@/common/storageTypes.js';
export default {
	data() {
		return {};
	},
	onLoad() {
		uni.setStorageSync(RESPONSE_TEST, true);
		this.getApi()
	},
	onUnload() {
		uni.setStorageSync(RESPONSE_TEST, false);
	},
	methods: {
		getApi () {
			this.$http.post('/api/concurrent1', {code: ACCESS_TOKEN_EXP}).then(res => {
				console.log('concurrent1 then');
				console.log(res);
			}).catch(err => {
				console.log('concurrent1 catch');
				console.log(err);
			})
			this.$http.post('/api/concurrent2', {code: ACCESS_TOKEN_EXP}).then(res => {
				console.log('concurrent2 then');
				console.log(res);
			}).catch(err => {
				console.log('concurrent2 catch');
				console.log(err);
			})
			this.$http.post('/api/concurrent3', {code: ACCESS_TOKEN_EXP}).then(res => {
				console.log('concurrent3 then');
				console.log(res);
			}).catch(err => {
				console.log('concurrent3 catch');
				console.log(err);
			})
			// 这个接口非常慢，用于测试新的accessToken 已经获取了，接口才响应
			this.$http.post('/api/concurrent4', {code: ACCESS_TOKEN_EXP}).then(res => {
				console.log('concurrent4 then');
				console.log(res);
			}).catch(err => {
				console.log('concurrent4 catch');
				console.log(err);
			})
		}
	}
};
</script>

<style lang="scss"></style>
