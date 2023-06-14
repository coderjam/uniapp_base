import http from "@/utils/http";

export const login = (params:any) => {
    return http.post('/app/py/user/login', params);
}