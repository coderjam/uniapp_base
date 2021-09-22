<template>
	<view class="content">
		<u-icon name="level" color="#2979ff" size="28"></u-icon>
		<u-button>默认按钮</u-button>
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
			this.$u.api.getSearch({
				id: 777
			}).then(res => {
				console.log(res);
			})
		},
		methods: {

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
