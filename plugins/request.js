import axios from "axios";
import { Message } from "element-ui";
const instance = axios.create({
    baseURL: "https://staging-api.huoxingy.com/v1/pos/",
    timeout: 5000,
    withCredentials:true
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        let tipText;
        error.response.data.message ? tipText = error.response.data.message : tipText = error.response.data;
        if (error.response.status == 401) {
            tipText = '帐号失效，请重新登录';
            setTimeout(()=>{
                // window.location.href = "/"
            },3000)
        } else if (error.response.status == 403) {
            tipText = '权限不足';
        }
        Message.error({
            message: tipText,
            customClass: 'error'
        })
    }
    return Promise.reject(error);
});
export default instance;