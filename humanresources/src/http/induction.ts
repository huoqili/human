// handlerinductionformInsert
import instance from "./http"
import {InductionForm} from "../type/induction"
import { returnPromise } from '../type/base'
const url = '/admin/induction';


// 入职审核添加
function handlerInductionformInsert(data:InductionForm):returnPromise {
    return instance.post(url,data)
}
function handlerInductionTable(data:any):returnPromise {
    return instance.get(url, {
        params: data
    });
}
function handlerInductionShow(inid:string):returnPromise {
    return instance.get(url+'/'+inid);
}
function handlerInductionUpdate(inid:string,data:InductionForm):returnPromise {
    return instance.put(url+'/'+inid, data);
}
function handlerInductionDelete(inid:number):returnPromise {
    return instance.delete(url+'/'+inid);
}
function handlerInStateUpdate(inid:number):returnPromise {
    return instance.put(url+'/'+inid);
}
export{
    handlerInductionformInsert,
    handlerInductionTable,
    handlerInductionShow,
    handlerInductionUpdate,
    handlerInductionDelete,
    handlerInStateUpdate
}