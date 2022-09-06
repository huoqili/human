/* 职位表单 */
import { Ref } from "@vue/reactivity";
export declare interface PositionForm{
    pid?: string,
    pname: string,
    did: string
}

/* 职位表格数据 */
export declare type PositionList = Ref<Array[PositionForm]>;
