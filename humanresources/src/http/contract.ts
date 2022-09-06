import instance from "./http";
import { ContractForm } from '../type/contract'
import { returnPromise } from '../type/base'
const url='/admin/contract'

function handlerContractInsert(data:ContractForm):returnPromise{
    return instance.post(url,data)
}
function handlerContractTable(data: any):returnPromise {
    return instance.get(url, {
        params: data
    });
}

function handlerContractDelete(cid:number):returnPromise {
    return instance.delete(url+'/'+cid);
}

function handlerContractShow(cid:string):returnPromise {
    return instance.get(url+'/'+cid);
}

function handlerContractUpdate(cid:string,data:any):returnPromise {
    return instance.put(url+'/'+cid, data);
}
export{
    handlerContractInsert,handlerContractTable,handlerContractDelete,handlerContractShow,handlerContractUpdate
}
