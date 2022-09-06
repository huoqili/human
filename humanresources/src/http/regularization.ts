import instance  from "./http";
import { RegularizationForm } from "@/type/regularization";
import { returnPromise } from "@/type/base";
const url ='admin/regularization'

function handlerRegularizationInsert(data:RegularizationForm):returnPromise{
    return instance.post(url,data)
}
function handlerRegularizationTable(data: any):returnPromise {
    return instance.get(url, {
        params: data
    });
}
function handlerRegularizationDelete(rid:number):returnPromise {
    return instance.delete(url+'/'+rid);
}
function handlerRegularizationShow(rid:string):returnPromise{
    return instance.get(url+'/'+rid)
}
function handlerRegularizationUpdate(rid:string,data:any):returnPromise{
    return instance.put(url+'/'+rid,data)
}
export{
    handlerRegularizationInsert,handlerRegularizationTable,handlerRegularizationDelete,handlerRegularizationShow,handlerRegularizationUpdate
}