import { Ref } from "@vue/reactivity";
import {Type} from './base'
// 合同表单
export declare interface ContractForm{
    cid?:string,
    sid:string
    ctype:Type,
    cname:string,
    start:string,
    end:string,
    try:string,
    Aparty:string,
    // Bparty:string
}
export declare type ContractTable = Ref<Array[ContractForm]>