import {HandOverForm} from '@/type/handover'
import instance from "./http";
import { returnPromise } from '../type/base'
const url = '/admin/handover';
function handlerHandoverInsert(data:HandOverForm):returnPromise{
     return instance.post(url,data)
}
function handlerHandoverTable(data:any):returnPromise{
    return instance.get(url, {
        params: data
    });
}

function handlerHandoverDelete(hid:number):returnPromise {
    return instance.delete(url+'/'+hid);
}

function handlerHandoverShow(hid:string):returnPromise {
    return instance.get(url+'/'+hid);
}

function handlerHandoverUpdate(hid:string,data:any):returnPromise {
    return instance.put(url+'/'+hid, data);
}
export {
    handlerHandoverInsert,
    handlerHandoverTable,
    handlerHandoverDelete,
    handlerHandoverShow,
    handlerHandoverUpdate
}