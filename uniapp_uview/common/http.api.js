//api集合
let apiApp = {
	login: '/api/login',
	getInfo: '/777/777/index',
}
let apiHome = {
	hotSearchUrl: '/777/77/hot_search'
}

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {
	
	// 此处没有使用传入的params参数
	let getSearch = (params = {}) => vm.$u.get(apiHome.hotSearchUrl, params);
	// 此处使用了传入的params参数，一切自定义即可
	
	let getInfo = (params = {}) => vm.$u.post(apiApp.getInfo, params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getSearch, getInfo};
}

export default {
	install
}