(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b9cb621"],{"0869":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return l}));var r=n("e293"),o="/admin/position";function a(e){return r["a"].get(o+"/"+e)}function u(e){return r["a"].put(o+"/"+e)}function l(){return r["a"].get(o+"/new")}},"0d76":function(e,t,n){"use strict";n("d1a6")},"2ce2":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=function(e){return Object(r["pushScopeId"])("data-v-d805cc26"),e=e(),Object(r["popScopeId"])(),e},a=o((function(){return Object(r["createElementVNode"])("span",{class:"el-form-item__label"},"新员工试用期自我考评",-1)})),u=o((function(){return Object(r["createElementVNode"])("hr",null,null,-1)})),l=o((function(){return Object(r["createElementVNode"])("span",{class:"el-form-item__label"},"试用期工作成果描述",-1)})),c=o((function(){return Object(r["createElementVNode"])("span",{class:"el-form-item__label"},"自我综合评价（收获与不足）",-1)})),i=o((function(){return Object(r["createElementVNode"])("span",{class:"el-form-item__label"},"未来工作计划和目标",-1)})),d=Object(r["createTextVNode"])("提交");function f(e,t,n,o,f,b){var m=Object(r["resolveComponent"])("el-option"),s=Object(r["resolveComponent"])("el-select"),j=Object(r["resolveComponent"])("el-form-item"),O=Object(r["resolveComponent"])("el-form"),p=Object(r["resolveComponent"])("el-date-picker"),g=Object(r["resolveComponent"])("el-col"),h=Object(r["resolveComponent"])("el-input"),V=Object(r["resolveComponent"])("el-button");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",null,[Object(r["createVNode"])(O,{model:e.regularizationForm},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(O,{inline:!0},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(j,{label:"职工部门"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.did,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.regularizationForm.did=t}),placeholder:"请选择职工职位",onChange:e.handlerPositionList},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.departmentList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:"department"+e.did,label:e.dname,value:e.did},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"])]})),_:1}),Object(r["createVNode"])(j,{label:"职工职位"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.pid,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.regularizationForm.pid=t}),placeholder:"请选择职工职位",onChange:e.handlerStaffList},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.positionList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:"position"+e.pid,label:e.pname,value:e.pid},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"])]})),_:1}),Object(r["createVNode"])(j,{label:"姓名"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.sid,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.regularizationForm.sid=t}),placeholder:"请选择id"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.staffList,(function(t){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:e.staff+t.sid,label:t.sname,value:t.sid},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1})]})),_:1}),Object(r["createVNode"])(j,{label:"申请日期"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(g,{span:11},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(p,{type:"date",placeholder:"选择日期",modelValue:e.regularizationForm.applydate,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.regularizationForm.applydate=t}),style:{width:"100%"}},null,8,["modelValue"])]})),_:1})]})),_:1}),a,u,Object(r["createVNode"])(O,{class:"content"},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",null,[l,Object(r["createVNode"])(j,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(h,{modelValue:e.regularizationForm.result,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.regularizationForm.result=t}),maxlength:"255",placeholder:"Please input","show-word-limit":"",type:"textarea",autosize:{minRows:10}},null,8,["modelValue"])]})),_:1})]),Object(r["createElementVNode"])("div",null,[c,Object(r["createVNode"])(j,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(h,{modelValue:e.regularizationForm.appraise,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.regularizationForm.appraise=t}),maxlength:"255",placeholder:"Please input","show-word-limit":"",type:"textarea",autosize:{minRows:10}},null,8,["modelValue"])]})),_:1})]),Object(r["createElementVNode"])("div",null,[i,Object(r["createVNode"])(j,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(h,{modelValue:e.regularizationForm.plan,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.regularizationForm.plan=t}),maxlength:"255",placeholder:"Please input","show-word-limit":"",type:"textarea",autosize:{minRows:10}},null,8,["modelValue"])]})),_:1})])]})),_:1}),Object(r["createVNode"])(j,{label:"试用期间对工作感到"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.forwork,"onUpdate:modelValue":t[7]||(t[7]=function(t){return e.regularizationForm.forwork=t}),placeholder:"请选择"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.workList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:"forwork"+e.id,label:e.value,value:e.id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(j,{label:"对公司人际关系感到"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.forpeople,"onUpdate:modelValue":t[8]||(t[8]=function(t){return e.regularizationForm.forpeople=t}),placeholder:"请选择"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.peopleList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:"forpeople"+e.id,label:e.value,value:e.id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(j,{label:"对目前的工作强度感到"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.forstrength,"onUpdate:modelValue":t[9]||(t[9]=function(t){return e.regularizationForm.forstrength=t}),placeholder:"请选择"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.strengthList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:"forstrength"+e.id,label:e.value,value:e.id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(j,{label:"对目前的工作量感到"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.forworkload,"onUpdate:modelValue":t[10]||(t[10]=function(t){return e.regularizationForm.forworkload=t}),placeholder:"请选择"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.workloadList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:"forworkload"+e.id,label:e.value,value:e.id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(j,{label:"对目前的工作环境感到"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.forenvironment,"onUpdate:modelValue":t[11]||(t[11]=function(t){return e.regularizationForm.forenvironment=t}),placeholder:"请选择"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.environmentList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:"forenvironment"+e.id,label:e.value,value:e.id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(j,{label:"对目前的工作待遇感到"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{modelValue:e.regularizationForm.forpay,"onUpdate:modelValue":t[12]||(t[12]=function(t){return e.regularizationForm.forpay=t}),placeholder:"请选择"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.payList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:"forpay"+e.id,label:e.value,value:e.id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(j,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(V,{type:"primary",onClick:e.handlerSubmit},{default:Object(r["withCtx"])((function(){return[d]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])])}n("d3b7"),n("3ca3"),n("ddb0");var b=n("9bf5"),m=n("0869"),s=n("2de2"),j=n("3ef4"),O=n("93c8"),p=n("6c02"),g=n("9244"),h=n("a778"),V=Object(r["defineComponent"])({setup:function(){var e=Object(p["c"])(),t=Object(r["ref"])({sid:"",did:"",pid:"",applydate:"",result:"",appraise:"",plan:"",forwork:1,forpeople:1,forstrength:1,forworkload:1,forenvironment:1,forpay:1}),n=Object(r["ref"])(),o=Object(r["ref"])(),a=function(){Object(m["a"])(t.value.did).then((function(e){e.data.code===s["a"]?(t.value.pid="",o.value=e.data.data):j["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))},u=Object(r["ref"])(),l=function(){Object(O["a"])(t.value.pid).then((function(e){e.data.code===s["a"]?(t.value.sid="",u.value=e.data.data):j["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))},c=Object(r["ref"])(),i=Object(r["ref"])(),d=Object(r["ref"])(),f=Object(r["ref"])(),V=Object(r["ref"])(),v=Object(r["ref"])(),k=function(){Object(g["e"])(t.value.rid,t.value).then((function(e){e.data.code===s["a"]?j["a"].success(e.data.msg):j["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))},w=function(){var r=e.query.rid;console.log("rid:"+r),Object(g["c"])(r).then((function(e){if(e.data.code===s["a"]){console.log("res在这里"),t.value=e.data.data;var n=t.value.pid,r=t.value.sid;a(),l(),setTimeout((function(){t.value.pid=n}),100),setTimeout((function(){t.value.sid=r}),150)}else j["a"].warning(e.data.msg)})).catch((function(e){console.log("错误："+e)})),Promise.all([Object(b["c"])(),Object(h["m"])(),Object(h["g"])(),Object(h["k"])(),Object(h["n"])(),Object(h["b"])(),Object(h["f"])()]).then((function(e){console.log(1111111),console.log(e),n.value=e[0].data.data,c.value=e[1].data.data,i.value=e[2].data.data,d.value=e[3].data.data,f.value=e[4].data.data,V.value=e[5].data.data,v.value=e[6].data.data})).catch((function(e){console.log(2),console.log(e)}))};return Object(r["onMounted"])((function(){w()})),{regularizationForm:t,handlerPositionList:a,departmentList:n,positionList:o,staffList:u,workList:c,peopleList:i,strengthList:d,workloadList:f,environmentList:V,payList:v,handlerStaffList:l,handlerSubmit:k}}}),v=(n("0d76"),n("6b0d")),k=n.n(v);const w=k()(V,[["render",f],["__scopeId","data-v-d805cc26"]]);t["default"]=w},9244:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"d",(function(){return u})),n.d(t,"a",(function(){return l})),n.d(t,"c",(function(){return c})),n.d(t,"e",(function(){return i}));var r=n("e293"),o="admin/regularization";function a(e){return r["a"].post(o,e)}function u(e){return r["a"].get(o,{params:e})}function l(e){return r["a"].delete(o+"/"+e)}function c(e){return r["a"].get(o+"/"+e)}function i(e,t){return r["a"].put(o+"/"+e,t)}},"93c8":function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"f",(function(){return l})),n.d(t,"b",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"g",(function(){return d})),n.d(t,"d",(function(){return f})),n.d(t,"a",(function(){return b})),n.d(t,"h",(function(){return m}));var r=n("e293"),o="/admin/staff",a="/admin/stafflist";function u(e){return r["a"].post(o,e)}function l(e){return r["a"].get(o,{params:e})}function c(e){return r["a"].delete(o+"/"+e)}function i(e){return r["a"].get(o+"/"+e)}function d(e,t){return r["a"].put(o+"/"+e,t)}function f(){return r["a"].get(o+"/new")}function b(e){return r["a"].get(o+"/"+e+"/edit")}function m(e){return r["a"].get(a+"/"+e)}},"9bf5":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return l})),n.d(t,"f",(function(){return c})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return d}));var r=n("e293"),o="/admin/department";function a(e){return r["a"].post(o,e)}function u(e){return r["a"].get(o,{params:e})}function l(e){return r["a"].get(o+"/"+e)}function c(e,t){return r["a"].put(o+"/"+e,t)}function i(e){return r["a"].delete(o+"/"+e)}function d(){return r["a"].get(o+"/new")}},a778:function(e,t,n){"use strict";n.d(t,"j",(function(){return g})),n.d(t,"h",(function(){return h})),n.d(t,"a",(function(){return V})),n.d(t,"i",(function(){return v})),n.d(t,"d",(function(){return k})),n.d(t,"c",(function(){return w})),n.d(t,"l",(function(){return C})),n.d(t,"m",(function(){return N})),n.d(t,"g",(function(){return B})),n.d(t,"k",(function(){return _})),n.d(t,"n",(function(){return F})),n.d(t,"b",(function(){return x})),n.d(t,"f",(function(){return z})),n.d(t,"e",(function(){return L}));var r=n("e293"),o="/admin/sex",a="/admin/political",u="/admin/education",l="/admin/quitreason",c="/admin/hwork",i="/admin/hstate",d="/admin/type",f="/admin/work",b="/admin/people",m="/admin/strength",s="/admin/workload",j="/admin/environment",O="/admin/pay",p="/admin/leave";function g(){return r["a"].get(o)}function h(){return r["a"].get(a)}function V(){return r["a"].get(u)}function v(){return r["a"].get(l)}function k(){return r["a"].get(c)}function w(){return r["a"].get(i)}function C(){return r["a"].get(d)}function N(){return r["a"].get(f)}function B(){return r["a"].get(b)}function _(){return r["a"].get(m)}function F(){return r["a"].get(s)}function x(){return r["a"].get(j)}function z(){return r["a"].get(O)}function L(){return r["a"].get(p)}},d1a6:function(e,t,n){}}]);
//# sourceMappingURL=chunk-6b9cb621.0e778e91.js.map