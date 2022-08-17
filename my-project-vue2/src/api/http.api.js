//api集合
let apiApp = {
	getInfo: '/api/getInfo',
	postInfo: '/api/postInfo'
}
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {

	//api方法
	let getInfo = (params={}) => vm.$u.get(apiApp.getInfo, params);
	let postInfo = (params={}) => vm.$u.post(apiApp.postInfo, params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = { getInfo, postInfo };
}

export default {
	install
}