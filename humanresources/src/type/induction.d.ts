// import { Ref } from "@vue/reactivity";

export declare interface InductionForm {
    inid ?: number,
    sname: string,
    did: string,
    pid: string,
    phone: string,
    email: string,
    snumber : string,
    sinduction: string,
    documenttype:string
    documentphone:string
    ssex:string,
    spolitical:string,
    snation:string,
    address:string
    smarriage:string,
    socialsecurity:string,
    saccumulationfund:string
    seducation:string,
    school:string,
    smajor:string,
    sgraduation:string,
    backcardnum:string
    back:string,
    linkman:string,
    relation:string,
    linkmanphone:string
 } 
 export declare type InductionTable = Ref<Array[InductionForm]>

 