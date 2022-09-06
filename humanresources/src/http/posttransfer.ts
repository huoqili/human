import instance from "./http";
import {PosttransferForm} from "../type/posttransfer"
import { returnPromise } from '../type/base'
const url = '/admin/posttransfer';


// 调岗记录添加
function handlerPosttransferInsert(data:PosttransferForm):returnPromise {
    return instance.post(url,data)
}
function handlerPosttransferTable(data:any):returnPromise {
    return instance.get(url, {
        params: data
    });
}
function handlerPosttransferUpdate(ptid:string,data:PosttransferForm):returnPromise {
    return instance.put(url+'/'+ptid, data);
}
function handlerPosttransferDelete(ptid:number):returnPromise {
    return instance.delete(url+'/'+ptid);
}
function handlerPosttransferShow(ptid:string):returnPromise {
    return instance.get(url+'/'+ptid);
}
function handlerPtstateUpdate(ptid:number):returnPromise {
    return instance.put(url+'/'+ptid);
}
export{
    handlerPosttransferShow,
    handlerPosttransferInsert,
    handlerPosttransferTable,
    handlerPosttransferDelete,
    handlerPosttransferUpdate,
    handlerPtstateUpdate

}