<template>
	<view>此页面会同时发起多个请求</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		this.globalGetData();
		this.localGetData();
	},
	methods: {
		globalGetData() {
			this.$http
				.post(
					'/api/user/update',
					{ id: Date.now() },
					{
						custom: { auth: true },
						params: {
							username: 'luch',
							email: Date.now() + '-------webwork.s@qq.com',
							address: Date.now() + '-------https://quanzhan.co'
						},
						header: { custom: 66 },
						getTask: (task, options) => {
							setTimeout(() => {
								task.abort();
							}, 1000);
							console.log(task);
							console.log(options);
						}
					}
				)
				.then(res => {
					console.log('全局/api/user/update更新用户信息 post success----期望custom 含有custom: 66');
					console.log(res);
				})
				.catch(err => {
					console.log('全局/api/user/update 更新用户信息 post fail----');
					console.log(err);
				});
		},

		localGetData() {
			let id = Math.random() > 0.5 ? Date.now() : undefined;
			// 替换用户信息
			this.$http
				.put(
					'/api/user/message',
					{ id: undefined, username: 'luch', email: Date.now() + '-------webwork.s@qq.com', address: Date.now() + '-------https://quanzhan.co' },
					{ params: { a: [1, 2, 3] } }
				)
				.then(res => {
					console.log('局部/api/user/message替换用户信息 get success----');
					console.log(res);
				})
				.catch(err => {
					console.log('局部/api/user/message替换用户信息 get fail----');
					console.log(err);
				});
			// 获取用户列表
			this.$http
				.get('/api/user/list')
				.then(res => {
					console.log('局部/api/user/list 获取用户列表 get success----');
					console.log(res);
				})
				.catch(err => {
					console.log('局部/api/user/list获取用户列表 get fail----');
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss"></style>
