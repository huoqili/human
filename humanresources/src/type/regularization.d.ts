export declare interface RegularizationForm{
    rid?:string,
    sid:string,
    did:string,
    pid:string
    applydate:string,
    result:'',
    appraise:'',
    plan:'',
    forwork:Work,
    forpeople:People,
    forstrength:Strength,
    forworkload:Workload,
    forenvironment:Environment,
    forpay:Pay
}
export declare type RegularizationTable = Ref<Array[RegularizationForm]>
