//请假添加
import { Ref } from 'vue'
import {HandlerFormSubmit,Change} from '@/type/department'
/**
 * 姓名 所在部门 申请日期 请假类型 请假事由 请假时间段 合计请假天数
 */
/**
 * 请假表单
 */
export declare interface LeaveForm{
    alid?:number,
    did:string,
    pid:string,
    sid:string,
    aldata:string,
    altype:string,
    alreason:string,
    alslot:string,
    aldays:number
}
/**
 * 请假查看表格表单
 */
export declare interface LeaveTable{
    alid?:number,
    dname?:string,
    pname?:string,
    sname?:string,
    aldata:string,
    altype:string,
    alreason:string,
    alstart:string,
    alend:string,
    aldays:number
}
export declare type LeaveaskTable = Ref<Array[LeaveTable]>
/**
 * 请假提交
 */

/**
 * 部分验证表单
 */

/**
 * 请假添加表单组件dom元素
 */
// export declare type LeaveFormDom = Ref;
/**
 * 请假添加返回值验证
 */
export declare interface ReturnLeaveInsertSetup{
    leaveForm:LeaveForm,
    handlerSubmit:HandlerFormSubmit,
    change:Change
    // leaveFormDom:Ref
}