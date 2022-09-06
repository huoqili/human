import instance from "./http";
const url = '/admin/leaveask'
import { returnPromise } from '../type/base'
import { LeaveForm } from "@/type/leaveInsert";
//添加
function handlerLeaveInsert(data:LeaveForm):returnPromise{
    return instance.post(url,data)
}
//查看
function handlerLerveTable(data:any):returnPromise{
    return instance.get(url,{
        params:data
    })
}
//修改
function handlerLeaveUpdate(alid:number,data:any):returnPromise{
    return instance.put(url+'/'+alid,data)
}
//编辑获取
function handlerLeaveaskShow(alid:string):returnPromise{
    return instance.get(url+'/'+alid);
}
export { handlerLeaveInsert,handlerLerveTable,handlerLeaveUpdate,handlerLeaveaskShow }