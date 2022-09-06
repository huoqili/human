import instance from "./http";
const url = '/admin/businesstravel'
import { returnPromise } from '../type/base'
import { BusinessForm } from "@/type/businessTravel";
//添加
function handlerBusinessInsert(data:BusinessForm):returnPromise{
    return instance.post(url,data)
}
//查看
function handlerBusinessTable(data:any):returnPromise{
    return instance.get(url,{
        params:data
    })
}
//修改
function handlerBusinessUpdate(btid:number,data:any):returnPromise{
    return instance.put(url+'/'+btid,data)
}
//编辑获取
function handlerBusinessShow(btid:string):returnPromise{
    return instance.get(url+'/'+btid);
}
export { handlerBusinessInsert,handlerBusinessTable,handlerBusinessUpdate,handlerBusinessShow }