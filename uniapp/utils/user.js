import userMessage from '@/store/userMessage.js'
import {
	http
} from '@/common/service.js'
/**
 * 验证是否登录
 * @return {Object} - 信息
 */
export function checkLogin() {
	

}

export const formatLoginMes = (data) => {
	console.log('format 的用户信息');
	console.log(data);
	return {
		nickname: data.name,
		age: data.age
	}
}

/**
 * 因为可能有多处需要更新用户信息，所以把更新封装出来
 */
// 更新用户信息
export const updateUserInfo = () => {
	http.get('/api/user/message/update').then(res => {
		userMessage.updateMessage(formatLoginMes(res.data.data))
	}).catch((err) => {
		console.log(err);
		uni.showToast({
			icon: 'none',
			title: '更新用户信息失败!'
		})
	})
}



