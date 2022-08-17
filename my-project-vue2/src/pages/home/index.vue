<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{ title }}</text>
			<text>{{ vuex_user.name }}</text>
		</view>
		<u-button @click="onToPage">跳转分包页面</u-button>
		<u-button type="primary">主要按钮</u-button>
		<u-button type="success">成功按钮</u-button>
		<u-button type="info">信息按钮</u-button>
		<u-button type="warning">警告按钮</u-button>
		<u-button type="error">危险按钮</u-button>

		<!-- 自定义的组件，已配置easycom，无需引入 -->
		<lb-button></lb-button>

		<!-- 自定义tabbar -->
		<!-- <u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar> -->
	</view>
</template>

<script>
export default {
    data() {
        return {
            title: "Hello lanba jam!"
        };
    },
    onLoad() {
        this.$u.vuex("vuex_user.name", "诗圣");
        this.$u.toast("Hello uView!");
        // this.getInfo()
    },
    methods: {
        onToPage() {
            uni.navigateTo({
                url: "/pages_sub/home/index"
            });
        },
        async getInfo() {
            let params = {
                id: 222
            };
            let res = await this.$u.api.getInfo(params);
        }
    },
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin: 200rpx auto 50rpx auto;
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
