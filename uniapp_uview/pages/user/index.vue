<template>
	<view class="content">
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
