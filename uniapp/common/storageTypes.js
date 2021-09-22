/**
 * 本地储存键 types
 * **/

const keys = 'm_' // 命名空间

export const USERINFO = `${keys}user_info`; // userinfo object
export const ACCESS_TOKEN = `${keys}access_token`; // access token
export const REFRESH_TOKEN = `${keys}refresh_token`; // refresh token
export const TOKEN_EXP_TIME = `${keys}token_exp_time`; // access token 过期时间 13位时间戳


export const RESPONSE_TEST = `${keys}response_test`; // 用户测试是否关闭request 拦截获取新的access_token； mock用

