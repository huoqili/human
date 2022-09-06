import instance from "./http";
const sexUrl = '/admin/sex';
const politicalUrl = '/admin/political';
const educationUrl = '/admin/education';
const quitreasonUrl = '/admin/quitreason';
const hworkUrl = '/admin/hwork';
const hstateUrl = '/admin/hstate';
const typeUrl='/admin/type'
const workUrl='/admin/work'
const peopleUrl='/admin/people'
const strengthUrl='/admin/strength'
const workloadUrl='/admin/workload'
const environmentUrl='/admin/environment'
const paykUrl='/admin/pay'
const leaveUrl = '/admin/leave';
const addressUrl = '/admin/address';
import { returnPromise } from '../type/base'
function handlerSexQuery():returnPromise{
    return instance.get(sexUrl)
}
function handlerPoliticalQuery():returnPromise {
    return instance.get(politicalUrl);
}
function handlerEducationQuery():returnPromise {
    return instance.get(educationUrl);
}
function handlerQuitReasonQuery():returnPromise{
    return instance.get(quitreasonUrl);
}
function handlerHworkQuery():returnPromise{
    return instance.get(hworkUrl);
}
function handlerHstateQuery():returnPromise{
    return instance.get(hstateUrl);
}
function handlerTypeQuery():returnPromise {
    return instance.get(typeUrl);
}
function handlerWorkQuery():returnPromise{
    return instance.get(workUrl)
}
function handlerPeopleQuery():returnPromise{
    return instance.get(peopleUrl)
}
function handlerStrengthQuery():returnPromise{
    return instance.get(strengthUrl)
}
function handlerWorkloadQuery():returnPromise{
    return instance.get(workloadUrl)
}
function handlerEnvironmentQuery():returnPromise{
    return instance.get(environmentUrl)
}
function handlerPayQuery():returnPromise{
    return instance.get(paykUrl)
}
function handlerLeaveQuery():returnPromise{
    return instance.get(leaveUrl)
}
function handlerAddress():returnPromise{
    return instance.get(addressUrl)
}
export {
    handlerSexQuery,
    handlerPoliticalQuery,
    handlerEducationQuery,
    handlerQuitReasonQuery,
    handlerHworkQuery,
    handlerHstateQuery,
    handlerTypeQuery,
    handlerWorkQuery,
    handlerPeopleQuery,
    handlerStrengthQuery,
    handlerWorkloadQuery,
    handlerEnvironmentQuery,
    handlerPayQuery,
    handlerLeaveQuery,
    handlerAddress
}