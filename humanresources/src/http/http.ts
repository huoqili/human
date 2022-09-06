import axios from 'axios';
import { URLPATH } from '@/config';
import { ElMessage} from 'element-plus'
import router from '@/router';
import store from '../store/index';
const instance = axios.create({
    baseURL: URLPATH,
    timeout: 8000
})
instance.interceptors.request.use(function(config) {
    const token = store.state.token;
    const headers = config.headers as Record<string,string>;
    token && (headers.token = token);
    return config;
},function(error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function(response) {
    return response;
},function(error) {
    const status:number = error.response.status;
    switch(status) {
        case 401:
            router.replace({name: 'login'});
            ElMessage.warning('没有提供认证信息');
            break;
        case 403:
            ElMessage.warning('请求的资源不允许访问');
            break;
        case 404:
            ElMessage.warning('请求资源不存在');
            break;
        case 500:
            ElMessage.warning('服务器错误');
            break;
        case 503:
            ElMessage.warning('服务暂时不可用，服务器正好在更新代码重启');
            break;
        default: 
            ElMessage.warning('出现错误了状态码为'+ status);
        }
    return Promise.reject(error);
});


export default instance;