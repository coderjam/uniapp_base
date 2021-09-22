const mode = 'devOnline'; //devLocal：本地测试、devOnline：线上测试、production：生产环境
let ROOTPATH = '';  //域名
switch (mode) {
	case 'devLocal':
		ROOTPATH = "http://192.168.2.5:61111"
		break;
	case 'devOnline':
		ROOTPATH = "https://xxxxx.cn"
		break;
	case 'production':
		ROOTPATH = "https://xxxxx.cn"
		break;
	default:
		throw new Error('未配置环境');
		console.log(`未配置环境`);
}
export { ROOTPATH }