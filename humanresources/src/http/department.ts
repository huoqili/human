import instance from "./http";
import { DepartmentForm } from '../type/department'
import { returnPromise } from '../type/base'
const url = '/admin/department';

function handlerDepartmentInsert(data:DepartmentForm): returnPromise {
    return instance.post(url,data)
}

function handlerDepartmentTable(data:any):returnPromise {
    return instance.get(url, {
        params: data
    });
}

function handlerDepartmentShow(did:string):returnPromise {
    return instance.get(url+'/'+did);
}

function handlerDepartmentUpdate(did:string,data:any):returnPromise{
    return instance.put(url+'/'+did,data);
}

function handlerDepartmentDelete(did:string):returnPromise {
    return instance.delete(url+'/'+did);
}

function handlerDepartmentList():returnPromise {
    return instance.get(url+'/new');
}

export {
    handlerDepartmentInsert,
    handlerDepartmentTable,
    handlerDepartmentShow,
    handlerDepartmentUpdate,
    handlerDepartmentDelete,
    handlerDepartmentList
}