//请假添加
import { Ref } from 'vue'
// import {HandlerFormSubmit,Change} from '@/type/department'
/**
 * 姓名 所在部门 申请日期 请假类型 请假事由 请假时间段 合计请假天数
 */
/**
 * 出差表单
 */
export declare interface BusinessForm{
    btid?:number,
    did:string,
    pid:string,
    sid:string,
    btdata:string,//出差申请日期
    btslot:string,//出差起止
    btdays:number,//出差天数 自行计算
    btreason:string,//出差原因
    btaddress:string,//地址
    btremarks:string//备注
}
/**
 * 出差查看表格表单
 */
export declare interface BusinessTable{
    btid?:number,
    dname?:string,
    pname?:string,
    sname?:string,
    btdata:string,//出差申请日期
    btstart:string,
    btend:string,
    btdays:number,//出差天数 自行计算
    btreason:string,//出差原因
    btaddress:string,//地址
    // btprovince:string,
    // btcity:string,
    // btcounty:string,
    btremarks:string//备注
}
export declare type BusinessAskTable = Ref<Array[BusinessTable]>
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