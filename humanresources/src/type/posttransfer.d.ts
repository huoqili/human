import { Ref } from "@vue/reactivity";

/* 
调岗申请表单
*/

export declare interface PosttransferForm {
    sid?: string,
    ptid?:string
    sname: string,
    did: string,
    pid: string,
    filingdate:string,
    snumber : string,
    sinduction: string,
    newdid: string,  
    newpid: string,
    ptreason:string
}
export declare type PosttransferTable = Ref<Array[PosttransferForm]>

