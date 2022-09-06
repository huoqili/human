import { Ref } from "@vue/reactivity";

/* 
    登录表单  接口
*/
export declare interface LoginForm{
    username: string,
    password: string
}
/* 
    表单验证
*/
export declare interface LoginRules{
    username: Array<T>,
    password: Array<T>
}
/* 
    提交函数
 */
export declare function SubmitForm():void

//重置函数
export declare function resetForm():void;

/* 
    setup返回值
*/
// export declare interface ReturnSetup{
//     loginForm:LoginForm,
//     ruleLogin,
//     ruleForm: Ref,
//     submitForm:
// }