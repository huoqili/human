import instance from "./http";
import { StaffForm } from '../type/staff'
import { returnPromise } from '../type/base'
const url = '/admin/staff';
const listurl = '/admin/stafflist'

function handlerStaffInsert(data:StaffForm): returnPromise {
    return instance.post(url,data)
}

function handlerStaffTable(data: any):returnPromise {
    return instance.get(url, {
        params: data
    });
}

function handlerStaffDelete(sid:number):returnPromise {
    return instance.delete(url+'/'+sid);
}

function handlerStaffShow(sid:string):returnPromise {
    return instance.get(url+'/'+sid);
}

function handlerStaffUpdate(sid:string,data:any):returnPromise {
    return instance.put(url+'/'+sid, data);
}
function handlerStaffList():returnPromise {
    return instance.get(url+'/new');
}

function handlerGetStaffList(pid:string):returnPromise{
    return instance.get(url+'/'+ pid+'/edit');
}

function handlerstaffList(pid:string):returnPromise{
    return instance.get(listurl+'/'+pid)
}




export {
    handlerStaffInsert,
    handlerStaffTable,
    handlerStaffDelete,
    handlerStaffShow,
    handlerStaffUpdate,
    handlerStaffList,
    handlerGetStaffList,
    handlerstaffList
}