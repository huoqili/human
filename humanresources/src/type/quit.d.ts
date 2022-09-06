import { Ref } from "@vue/reactivity";
import {quitreason} from '../type/base'
export declare interface QuitForm{
    qid?:string
    qname:string,
    qapplication:string,
    qnumber:string,
    did:string,
    qinduction:string,
    qlasttime:string,
    qreason:quitreason,
    qnote:string
}
export declare type QuitTable = Ref<Array[QuitForm]>
