import { Ref } from "@vue/reactivity";
import { hstate, hwork } from "./base";

export declare interface HandOverForm{
    hid?:string
    sname:string,
    qapplication:string,
    snumber:string,
    pid:string,
    did:string,
    sinduction:string,
    hactual:string,
    hwork:hwork,
    hstate:hstate,
    hperson:string,
    htime:string
}
export declare type HandOverTable = Ref<Array[HandOverForm]>