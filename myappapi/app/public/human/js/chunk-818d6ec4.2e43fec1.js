(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-818d6ec4"],{"0869":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return c}));var r=n("e293"),o="/admin/position";function a(e){return r["a"].get(o+"/"+e)}function u(e){return r["a"].put(o+"/"+e)}function c(){return r["a"].get(o+"/new")}},"1d5a":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o={class:"recruit-edit"},a=Object(r["createTextVNode"])("提交编辑");function u(e,t,n,u,c,l){var i=Object(r["resolveComponent"])("el-date-picker"),d=Object(r["resolveComponent"])("el-form-item"),m=Object(r["resolveComponent"])("el-input"),f=Object(r["resolveComponent"])("el-option"),b=Object(r["resolveComponent"])("el-select"),s=Object(r["resolveComponent"])("el-button"),p=Object(r["resolveComponent"])("el-form");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",o,[Object(r["createVNode"])(p,{model:e.recruitForm,"label-position":"top"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(d,{label:"日期时间"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(i,{type:"date",style:{width:"25%"},modelValue:e.recruitForm.rtimes,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.recruitForm.rtimes=t}),placeholder:"请选择日期"},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"申请人"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{style:{width:"25%"},modelValue:e.recruitForm.rname,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.recruitForm.rname=t}),placeholder:"请输入申请人姓名"},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"需求部门"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{style:{width:"25%"},modelValue:e.recruitForm.did,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.recruitForm.did=t}),placeholder:"请选择职工职位",onChange:e.handlerPositionList},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.departmentList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(f,{key:"department"+e.did,label:e.dname,value:e.did},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"])]})),_:1}),Object(r["createVNode"])(d,{label:"需求职位"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{style:{width:"25%"},modelValue:e.recruitForm.pid,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.recruitForm.pid=t}),placeholder:"请选择职工职位"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.positionList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(f,{key:"position"+e.pid,label:e.pname,value:e.pid},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"招聘人数"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{style:{width:"25%"},type:"number",modelValue:e.recruitForm.rnum,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.recruitForm.rnum=t}),placeholder:"请输入招聘人数"},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"薪酬建议"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{style:{width:"25%"},modelValue:e.recruitForm.rsalayarea,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.recruitForm.rsalayarea=t}),placeholder:"请输入薪酬建议"},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"招聘原因",class:"form-item-half"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{type:"textarea",maxlength:"250","show-word-limit":"",autosize:{minRows:8,maxRows:8},modelValue:e.recruitForm.rreason,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.recruitForm.rreason=t})},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"岗位职责",class:"form-item-half"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{type:"textarea",maxlength:"250","show-word-limit":"",autosize:{minRows:8,maxRows:8},modelValue:e.recruitForm.rduty,"onUpdate:modelValue":t[7]||(t[7]=function(t){return e.recruitForm.rduty=t})},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"任职条件",class:"form-item-half"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{type:"textarea",maxlength:"250","show-word-limit":"",autosize:{minRows:8,maxRows:8},modelValue:e.recruitForm.rcondition,"onUpdate:modelValue":t[8]||(t[8]=function(t){return e.recruitForm.rcondition=t})},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"期望到岗时间"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(i,{style:{width:"25%"},type:"date",modelValue:e.recruitForm.arrive,"onUpdate:modelValue":t[9]||(t[9]=function(t){return e.recruitForm.arrive=t}),placeholder:"请选择到岗时间"},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{label:"紧急程度"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{style:{width:"25%"},modelValue:e.recruitForm.urgent,"onUpdate:modelValue":t[10]||(t[10]=function(t){return e.recruitForm.urgent=t}),placeholder:"请选择紧急程度"},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.urgentArr,(function(e,t){return Object(r["openBlock"])(),Object(r["createBlock"])(f,{key:"urgent"+t,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(d,{style:{"margin-top":"30px"}},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{type:"primary",onClick:e.handlerRecruitUpdateSubmit},{default:Object(r["withCtx"])((function(){return[a]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])])}var c=n("2de2"),l=n("3ef4"),i=n("6c02"),d=n("c94e"),m=n("9bf5"),f=n("0869"),b=Object(r["defineComponent"])({setup:function(){var e=Object(i["c"])(),t=Object(r["ref"])(),n=Object(r["ref"])({rtimes:"",did:"",pid:"",rname:"",rnum:"",rsalayarea:"",rreason:"",rduty:"",rcondition:"",urgent:"",arrive:""}),o=[{label:"一般",value:0},{label:"紧急",value:1}],a=Object(r["ref"])(),u=function(){Object(f["a"])(n.value.did).then((function(e){e.data.code===c["a"]?(n.value.pid="",t.value=e.data.data):l["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))},b=function(){var t=e.query.rid;Object(d["d"])(t).then((function(e){if(e.data.code===c["a"]){n.value=e.data.data;var t=n.value.pid;u(),setTimeout((function(){n.value.pid=t}),80)}else l["a"].warning(e.data.msg)})).catch((function(e){console.log(e)})),Object(m["c"])().then((function(e){e.data.code===c["a"]?a.value=e.data.data:l["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))},s=function(){Object(d["e"])(n.value).then((function(e){e.data.code===c["a"]?l["a"].success(e.data.msg):l["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))};return Object(r["onMounted"])((function(){b()})),{recruitForm:n,urgentArr:o,departmentList:a,positionList:t,handlerRecruitUpdateSubmit:s}}}),s=n("6b0d"),p=n.n(s);const j=p()(b,[["render",u]]);t["default"]=j},"9bf5":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return c})),n.d(t,"f",(function(){return l})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return d}));var r=n("e293"),o="/admin/department";function a(e){return r["a"].post(o,e)}function u(e){return r["a"].get(o,{params:e})}function c(e){return r["a"].get(o+"/"+e)}function l(e,t){return r["a"].put(o+"/"+e,t)}function i(e){return r["a"].delete(o+"/"+e)}function d(){return r["a"].get(o+"/new")}},c94e:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return u})),n.d(t,"d",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return i})),n.d(t,"f",(function(){return d}));var r=n("e293"),o="/admin/recruit";function a(e){return r["a"].post(o,e)}function u(e){return r["a"].get(o,{params:e})}function c(e){return r["a"].get(o+"/"+e)}function l(e){return r["a"].put(o+"/1",e)}function i(e){return r["a"].delete(o+"/"+e)}function d(e){return r["a"].get(o+"/new",{params:e})}}}]);
//# sourceMappingURL=chunk-818d6ec4.2e43fec1.js.map