// @ts-ignore
const request = ({url,method,data})=>{
    console.log('request')
    const token = uni.getStorageSync('token');
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            method,
            data,
            timeout: 100000,
            header: {
                token // 自定义请求头信息
            },
            success: (res) => {
                // @ts-ignore
                const { code, data } = res;
                switch (code) {
                    case 200:
                        break;
                    case 401: // token过期
                        break;
                    default:
                        break;
                }
                resolve(data)
            },
            fail: (err) => {
                console.log(err);
                reject(err)
            },
            complete: () => {
                console.log('request complete');
            }
        });
    })
}

const http = {
    get: (url:string,data={}) => request({url, data, method: 'GET'}),
    post: (url:string,data={}) => request({url, data, method: 'POST'})
}
export default http;