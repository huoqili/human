import { Ref } from 'vue';
export declare interface RecruitForm {
    rid?:string,
    rtimes: string,
    did: string,
    pid: string,
    rname: string,
    rnum: string,
    rsalayarea: string,
    rreason: string,
    rduty: string,
    rcondition: string,
    urgent: string,
    arrive: string
}
export declare type RecruitTable = Ref<Array[RecruitForm]>;