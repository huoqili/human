// 部门添加

import { Ref } from "@vue/reactivity";

/* 
    部门添加表单
*/
 export declare interface DepartmentForm {
    did ?: number,
    dnum: string,
    dname: string
 } 
/* 
    部分验证表单
*/
export declare interface DepartmentRules {
    dnum: Array<any>,
    dname: Array<any>
}

/* 
    部门添加方法

*/
export declare function HandlerFormSubmit():void

/* 
    部门添加表单组件
    
*/


/* 
    部分管理 --- 部门添加setup返回值
*/
export declare interface ReturnDepartmentInsertSetup {
    departmentForm : DepartmentForm,
    departmentRules: DepartmentRules,
    departmentformdom:DepartmentFormDom,
    handlerFormSubmit: HandlerFormSubmit
}

/* 部门查看 */

/* 搜索表单 */
export declare interface SearchForm{
    dname: string,
    dnum: string
}

/* 分页 */
export declare interface Paginate {
    page: number,
    limit: number
}
/* 部门表格 */
export declare type DepartmentTable = Ref<Array<DepartmentForm>>

export declare function InitDepartmentTable():void









