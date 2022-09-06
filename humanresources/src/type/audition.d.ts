import { Ref } from 'vue';
export declare interface AuditionForm {
    aid?:number,
    times: string,
    aname: string,
    rid: string,
    aphone: string,
    resume: string,
    [propName:string]: any
}
export declare interface  StationForm {
    dname: string,
    pname: string,
    rduty: string,
    rcondition: string
}
export declare interface RecruitDutyForm {
    pname: '',
    rduty: '',
    rcondition: ''
}
export declare type RecruitDutyTable = Ref<Array<RecruitDutyForm>>
export declare type AuditionTable = Ref<Array<AuditionForm>>