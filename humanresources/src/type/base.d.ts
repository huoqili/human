import { AxiosResponse } from "axios";
import { Ref } from "@vue/reactivity";

export declare interface UserInfo {
    id: number,
    username: string
}

/* 后台返回的接口定义 */
export declare interface backEndReturnData {
    code: 200 | 404,
    msg: string,
    count ?: number,
    data ?: Array<T> | Record<string,any>,
    token ?: string,
    userInfo?: UserInfo
}

/* 
    axios所有请求方法返回值
*/
export declare type returnPromise = Promise<AxiosResponse<backEndReturnData>> 

/* 分页 */
export declare interface Paginate {
    page: number,
    limit: number
}

/* 
    性别
    男1，女2
 */
export declare enum Sex {
    man = 1,
    woman = 2
}

/* 政治面貌  党1 团2 群3 其他4 */
export declare enum Political {
    party = 1,
    member = 2,
    crowd = 3,
    other = 4
}

/* 学历  硕 1 学士 2 大专3 其他4 */
export declare enum Education {
    master = 1,
    bachelor = 2,
    junior = 3,
    other = 4
}

export declare interface DropDownMenu {
    id: number,
    value: string
}

export declare interface anyObj {
    [propName:string]:any,
    [index:number]:string
}

export declare type DropDownMenuArr = Ref<Array[DropDownMenu]>




