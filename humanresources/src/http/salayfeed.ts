import instance from "./http";
const url = '/admin/salayback';
import { returnPromise } from '../type/base';
function handlerSalayFeedBackInsert(data: any):returnPromise{
    return instance.post(url,data);
}

function handlerStaffInfoBySnumber(data:any):returnPromise{
    return instance.get(url+'/new', {
        params: data
    });
}

function handlerSalayFeedBackIndex(data: any): returnPromise {
    return instance.get(url, {
        params: data
    })
}

function handlerSalayFeedStateChange(fid:string,state: number):returnPromise {
    return instance.put(url+'/'+fid, {fstate:state});
}

export {
    handlerSalayFeedBackInsert,
    handlerStaffInfoBySnumber,
    handlerSalayFeedBackIndex,
    handlerSalayFeedStateChange
}
