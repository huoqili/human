import { returnPromise } from "@/type/base";
import instance from "./http";
const url = '/admin/recruit';

function handlerRecruitInsert(data:any):returnPromise {
    return instance.post(url, data);
}

function handlerGetRecruitIndex(data: any):returnPromise {
    return instance.get(url, {
        params: data
    });
}

function handlerRecruitShow(rid:string):returnPromise {
    return instance.get(url+'/'+rid);
}

function handlerRecruitUpdate(data: any):returnPromise {
    return instance.put(url+'/1', data);
}

function handlerRecruitDelete(rid:number):returnPromise {
    return instance.delete(url+'/'+rid);
}

function handlerRutyList(data:any):returnPromise {
    return instance.get(url+'/new',{
        params: data
    });
 }

export {
    handlerRecruitInsert,
    handlerGetRecruitIndex,
    handlerRecruitShow,
    handlerRecruitUpdate,
    handlerRecruitDelete,
    handlerRutyList
    
}