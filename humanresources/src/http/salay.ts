import instance from "./http";
const url = '/admin/salay';
import { returnPromise } from '../type/base';
import { SalayForm } from '../type/salay'

const handlerSalayInsert = (data:SalayForm):returnPromise => {
    return instance.post(url, data);
}

function handlerSalayTable(data: any):returnPromise {
    return instance.get(url, {
        params: data
    });
}

function handlerSalayOne(sid: string):returnPromise {
    return instance.get(url+'/'+sid);
}

function handlerSalayUpdate(data: any):returnPromise {
    
    return instance.put(url + '/1',data);
}

function handlerSalayEcharts():returnPromise {
    return instance.delete(url + '/1');
}

export {
    handlerSalayInsert,
    handlerSalayTable,
    handlerSalayEcharts,
    handlerSalayOne,
    handlerSalayUpdate
}