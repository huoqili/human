(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c168d9e"],{"0869":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return c}));var r=n("e293"),o="/admin/position";function a(e){return r["a"].get(o+"/"+e)}function u(e){return r["a"].put(o+"/"+e)}function c(){return r["a"].get(o+"/new")}},"93c8":function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"f",(function(){return u})),n.d(t,"b",(function(){return c})),n.d(t,"e",(function(){return d})),n.d(t,"g",(function(){return l})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return f}));var r=n("e293"),o="/admin/staff";function a(e){return r["a"].post(o,e)}function u(e){return r["a"].get(o,{params:e})}function c(e){return r["a"].delete(o+"/"+e)}function d(e){return r["a"].get(o+"/"+e)}function l(e,t){return r["a"].put(o+"/"+e,t)}function i(){return r["a"].get(o+"/new")}function f(e){return r["a"].get(o+"/"+e+"/edit")}},"9bf5":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return c})),n.d(t,"f",(function(){return d})),n.d(t,"a",(function(){return l})),n.d(t,"c",(function(){return i}));var r=n("e293"),o="/admin/department";function a(e){return r["a"].post(o,e)}function u(e){return r["a"].get(o,{params:e})}function c(e){return r["a"].get(o+"/"+e)}function d(e,t){return r["a"].put(o+"/"+e,t)}function l(e){return r["a"].delete(o+"/"+e)}function i(){return r["a"].get(o+"/new")}},a778:function(e,t,n){"use strict";n.d(t,"i",(function(){return j})),n.d(t,"g",(function(){return O})),n.d(t,"a",(function(){return v})),n.d(t,"h",(function(){return V})),n.d(t,"d",(function(){return g})),n.d(t,"c",(function(){return w})),n.d(t,"k",(function(){return k})),n.d(t,"l",(function(){return C})),n.d(t,"f",(function(){return F})),n.d(t,"j",(function(){return N})),n.d(t,"m",(function(){return x})),n.d(t,"b",(function(){return B})),n.d(t,"e",(function(){return _}));var r=n("e293"),o="/admin/sex",a="/admin/political",u="/admin/education",c="/admin/quitreason",d="/admin/hwork",l="/admin/hstate",i="/admin/type",f="/admin/work",b="/admin/people",m="/admin/strength",p="/admin/workload",h="/admin/environment",s="/admin/pay";function j(){return r["a"].get(o)}function O(){return r["a"].get(a)}function v(){return r["a"].get(u)}function V(){return r["a"].get(c)}function g(){return r["a"].get(d)}function w(){return r["a"].get(l)}function k(){return r["a"].get(i)}function C(){return r["a"].get(f)}function F(){return r["a"].get(b)}function N(){return r["a"].get(m)}function x(){return r["a"].get(p)}function B(){return r["a"].get(h)}function _(){return r["a"].get(s)}},bb44:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"d",(function(){return u})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return d})),n.d(t,"e",(function(){return l}));var r=n("e293"),o="/admin/handover";function a(e){return r["a"].post(o,e)}function u(e){return r["a"].get(o,{params:e})}function c(e){return r["a"].delete(o+"/"+e)}function d(e){return r["a"].get(o+"/"+e)}function l(e,t){return r["a"].put(o+"/"+e,t)}},d131:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=Object(r["createTextVNode"])("提交");function a(e,t,n,a,u,c){var d=Object(r["resolveComponent"])("el-option"),l=Object(r["resolveComponent"])("el-select"),i=Object(r["resolveComponent"])("el-form-item"),f=Object(r["resolveComponent"])("el-date-picker"),b=Object(r["resolveComponent"])("el-col"),m=Object(r["resolveComponent"])("el-input"),p=Object(r["resolveComponent"])("el-button"),h=Object(r["resolveComponent"])("el-form");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",null,[Object(r["createVNode"])(h,{model:e.handoverForm,"label-width":"120px"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(i,{label:"申请人部门"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,{modelValue:e.handoverForm.did,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.handoverForm.did=t}),placeholder:"请选择职工部门",onChange:t[1]||(t[1]=function(t){return e.departmentChange(e.handoverForm.did)})},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.departmentList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(d,{key:"department"+e.did,label:e.dname,value:e.dname},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(i,{label:"申请人工位"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,{modelValue:e.handoverForm.pid,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.handoverForm.pid=t}),placeholder:"请选择职工职位",onChange:t[3]||(t[3]=function(t){return e.positionChange(e.handoverForm.pid)})},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.positionList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(d,{key:"position"+e.did,label:e.pname,value:e.pname},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(i,{label:"申请人"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,{modelValue:e.handoverForm.sname,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.handoverForm.sname=t}),placeholder:"请选择职工姓名"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.staffList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(d,{key:"staff"+e.sid,label:e.sname,value:e.sname},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(i,{label:"申请人工号"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,{modelValue:e.handoverForm.snumber,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.handoverForm.snumber=t}),placeholder:"请选择职工工号"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.staffList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(d,{key:"staff"+e.did,label:e.snumber,value:e.snumber},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(i,{label:"申请人入职时间"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{span:11},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,{modelValue:e.handoverForm.sinduction,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.handoverForm.sinduction=t}),type:"date",placeholder:"选择申请人入职日期",style:{width:"100%"}},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(r["createVNode"])(i,{label:"离职申请时间"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{span:10},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,{modelValue:e.handoverForm.qapplication,"onUpdate:modelValue":t[7]||(t[7]=function(t){return e.handoverForm.qapplication=t}),type:"date",placeholder:"选择申请离职日期",style:{width:"100%"}},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(r["createVNode"])(i,{label:"实际离职时间"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{span:9},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,{modelValue:e.handoverForm.hactual,"onUpdate:modelValue":t[8]||(t[8]=function(t){return e.handoverForm.hactual=t}),type:"date",placeholder:"选择实际离职日期",style:{width:"100%"}},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(r["createVNode"])(i,{label:"工作交接状态",inline:!0},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,{placeholder:"请选择交接工作状态",modelValue:e.handoverForm.hstate,"onUpdate:modelValue":t[9]||(t[9]=function(t){return e.handoverForm.hstate=t})},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.hstateList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(d,{key:"hstate"+e.id,label:e.value,value:e.id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(i,{label:"工作交接人"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{modelValue:e.handoverForm.hperson,"onUpdate:modelValue":t[10]||(t[10]=function(t){return e.handoverForm.hperson=t}),placeholder:"请输入工作交接人"},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(i,{label:"工作交接时间"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{span:8},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,{modelValue:e.handoverForm.htime,"onUpdate:modelValue":t[11]||(t[11]=function(t){return e.handoverForm.htime=t}),type:"date",placeholder:"选择交接日期",style:{width:"100%"}},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(r["createVNode"])(i,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(p,{type:"primary",onClick:e.handlerSubmit},{default:Object(r["withCtx"])((function(){return[o]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])])}n("d3b7"),n("3ca3"),n("ddb0");var u=n("9bf5"),c=n("bb44"),d=n("93c8"),l=n("a778"),i=n("2de2"),f=n("0869"),b=n("3ef4"),m=n("6c02"),p=Object(r["defineComponent"])({setup:function(){var e=Object(r["reactive"])({sname:"",qapplication:"",snumber:"",pid:"",did:"",sinduction:"",hactual:"",hwork:1,hstate:1,hperson:"",htime:""}),t=Object(m["d"])(),n=Object(r["ref"])(),o=Object(r["ref"])(),a=Object(r["ref"])(),p=Object(r["ref"])(),h=Object(r["ref"])(),s=function(){for(var r=o.value,a="",u=0;u<r.length;u++)r[u].pname===e.pid&&(a=r[u].pid);e.pid=a;for(var d=n.value,l="",f=0;f<d.length;f++)d[f].dname===e.did&&(l=d[f].did);e.did=l,Object(c["b"])(e).then((function(e){e.data.code===i["a"]?(b["a"].success(e.data.msg),t.push({name:"handoverindex"})):b["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))},j=function(){Promise.all([Object(u["c"])(),Object(l["d"])(),Object(l["c"])()]).then((function(e){n.value=e[0].data.data,p.value=e[1].data.data,h.value=e[2].data.data})).catch((function(e){console.log(e)}))},O=function(t){for(var r=n.value,a="",u=0;u<r.length;u++)r.dname===t&&(a=r.did);e.pid="",Object(f["a"])(a).then((function(e){var t=e.data.data;o.value=t}))},v=function(t){e.sname="",Object(d["d"])().then((function(e){a.value=e.data.data}))};return Object(r["onMounted"])((function(){j()})),{handoverForm:e,departmentList:n,positionList:o,hworkList:p,staffList:a,hstateList:h,handlerSubmit:s,departmentChange:O,positionChange:v}}}),h=n("6b0d"),s=n.n(h);const j=s()(p,[["render",a]]);t["default"]=j}}]);
//# sourceMappingURL=chunk-3c168d9e.590ed08c.js.map