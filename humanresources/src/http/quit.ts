import instance from "./http";
import { returnPromise } from '../type/base'
import {QuitForm} from '../type/quit'
const url = '/admin/quit';
function handlerQuitInsert(data:QuitForm): returnPromise {
    return instance.post(url,data)
}
function handlerQuitIndex(data:any):returnPromise{
    return instance.get(url,{
        params:data
    });
}
function handlerQuitDelete(qid:number):returnPromise {
    return instance.delete(url+'/'+qid);
}

function handlerQuitShow(qid:string):returnPromise {
    return instance.get(url+'/'+qid);
}

function handlerQuitUpdate(qid:string,data:any):returnPromise {
    return instance.put(url+'/'+qid, data);
}



export {
    handlerQuitInsert,
    handlerQuitIndex,
    handlerQuitDelete,
    handlerQuitShow,
    handlerQuitUpdate
}