import instance from "./http";
import { LoginForm } from '../type/login'

import { returnPromise } from '../type/base'
const loginUrl = '/admin/login';
function handlerLogin(data: LoginForm): returnPromise{
    return instance.post(loginUrl, data);
}

export {
    handlerLogin
}