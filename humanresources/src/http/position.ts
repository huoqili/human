import instance from "./http";
const url = '/admin/position';
import { returnPromise } from '../type/base';

function handlerGetPositionList(did:string):returnPromise{
    return instance.get(url+'/'+ did);
}

function handlerOneGetAllNames(pid:string):returnPromise {
    return instance.put(url+'/'+pid);
}

function handlerPoaitionList():returnPromise {
    return instance.get(url+'/new');
}
export {
    handlerGetPositionList,
    handlerOneGetAllNames,
    handlerPoaitionList
}