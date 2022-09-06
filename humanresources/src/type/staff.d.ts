import { Ref } from "@vue/reactivity";
/* 
    员工添加
*/

/* 员工表单 */
/* 表单验证 */
/* 表单组件 */
/* 提交方法 */
import { Sex,Political,Education } from './base'
export declare interface StaffForm {
    sid?: string,
    sname: string,
    did: string,
    pid: string,
    phone: string,
    email: string,
    snumber : string,
    sinduction: string,
    ssex: Sex,
    spolitical: Political,
    seducation: Education,
    school: string,
    smajor: string,
    sgraduation: string  
}

export declare type StaffTable = Ref<Array[StaffForm]>



