import instance from "./http";
import { returnPromise } from '../type/base'
const url = '/admin/audition';
function handlerAuditionInsert(data:any):returnPromise{
    return instance.post(url,data);
}
function handlerAuditionIndex(data:any):returnPromise {
    return instance.get(url, {
        params: data
    });
}

function handlerConditionShow(aid:number):returnPromise{
    return instance.get(url+'/'+aid);
}

function handlerAuditionUpdate(data:any):returnPromise {
    return instance.put(url+'/1', data);
}
function handlerAuditionNew():returnPromise {
    return instance.get(url+'/new');
}
export {
    handlerAuditionInsert,
    handlerAuditionIndex,
    handlerConditionShow,
    handlerAuditionUpdate,
    handlerAuditionNew
}
