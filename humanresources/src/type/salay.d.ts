import { Ref } from "vue";
export declare interface SalayForm{
    sid?: string,
    sname: string,
    sphone: string,
    sbasicsalay: string,
    sovertimesalay: string,
    sprizesalay: string,
    ssubsidysalay: string,
    attendancesalay: string,
    fivesalay: string,
    taxsalay: string,
    factsalay: number,
    ssure?: string,
    stime: string,
    did?: string,
    pid?:string
}

export declare type SalayTable = Ref<Array[SalayForm]>;

export declare interface FeedBackForm{
    fid?:number,
    sname: string,
    snumber: string,
    pname: string,
    dname: string,
    ftimes: string,
    freason: string
} 
export declare type FeedBackTable = Ref<Array[FeedBackForm]>;

export declare interface Bar{
    value: number,
    name: string
}
export declare type BarTable = Ref<Array<Bar>>