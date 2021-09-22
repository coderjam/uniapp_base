<template>
	<view class="content">
		<u-icon name="level" color="#2979ff" size="28"></u-icon>
		<u-button @click="onToPage">跳转分包页面</u-button>
		<u-button type="primary">主要按钮</u-button>
		<u-button type="success">成功按钮</u-button>
		<u-button type="info">信息按钮</u-button>
		<u-button type="warning">警告按钮</u-button>
		<u-button type="error">危险按钮</u-button>
		<div>{{vuex_user.name}}</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.$u.vuex('vuex_user.name', '诗圣');
			this.$u.toast('Hello uView!');
			// 调用getSearch接口
			this.getSearch()
			this.getInfo()
		},
		methods: {
			onToPage(){
				uni.navigateTo({
				    url: '/package_sub/pages/index/index'
				});
			},
			async getSearch(){
				let params = {
					id:111
				}
				let res = await this.$u.api.getSearch(params)
				console.log('res',res)
			},
			async getInfo(){
				let params = {
					id:222
				}
				let res = await this.$u.api.getInfo(params)
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
