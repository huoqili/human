(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a841d076"],{"157e":function(e,t,a){},bebd:function(e,t,a){"use strict";a("157e")},ddb1:function(e,t,a){"use strict";a.r(t);var n=a("7a23"),o={class:"box1"},l={class:"box1"},c={class:"box1"},r={class:"box1"},i=Object(n["createElementVNode"])("p",{style:{color:"skyblue",margin:"15px 0"}},"面试记录",-1),u=["href"],d={class:"dialog-footer"},b=Object(n["createTextVNode"])("取消"),j=Object(n["createTextVNode"])("提交");function O(e,t,a,O,m,f){var s=Object(n["resolveComponent"])("el-col"),p=Object(n["resolveComponent"])("el-row"),V=Object(n["resolveComponent"])("el-table-column"),h=Object(n["resolveComponent"])("el-table"),w=Object(n["resolveComponent"])("el-pagination"),C=Object(n["resolveComponent"])("el-input"),g=Object(n["resolveComponent"])("el-form-item"),N=Object(n["resolveComponent"])("el-option"),v=Object(n["resolveComponent"])("el-select"),x=Object(n["resolveComponent"])("el-date-picker"),E=Object(n["resolveComponent"])("el-form"),k=Object(n["resolveComponent"])("el-button"),_=Object(n["resolveComponent"])("el-dialog");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createVNode"])(p,{gutter:24},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,{span:6},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",o,"面试通过"+Object(n["toDisplayString"])(e.echartData.pass)+"人",1)]})),_:1}),Object(n["createVNode"])(s,{span:6},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",l,"面试未通过"+Object(n["toDisplayString"])(e.echartData.nopass)+"人",1)]})),_:1}),Object(n["createVNode"])(s,{span:6},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",c,"录取"+Object(n["toDisplayString"])(e.echartData.empass)+"人",1)]})),_:1}),Object(n["createVNode"])(s,{span:6},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",r,"未录取"+Object(n["toDisplayString"])(e.echartData.emnopass)+"人",1)]})),_:1})]})),_:1}),i,Object(n["createVNode"])(h,{class:"audition-query",onRowClick:e.handlerTableRowClick,"header-cell-style":{background:"#000"},data:e.auditionTable,height:"400","row-class-name":e.tableRowClassName,border:""},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(V,{label:"日期时间",prop:"recruit.rtimes",width:"120"}),Object(n["createVNode"])(V,{label:"负责招聘人员",prop:"recruit.rname",width:"120"}),Object(n["createVNode"])(V,{label:"招聘部门",prop:"recruit.department.dname",width:"120"}),Object(n["createVNode"])(V,{label:"关联招聘需求",prop:"recruit.position.pname",width:"180"}),Object(n["createVNode"])(V,{label:"应聘者姓名",prop:"aname",width:"120"}),Object(n["createVNode"])(V,{label:"应聘者手机号",prop:"aphone",width:"150"}),Object(n["createVNode"])(V,{label:"简历",width:"120"},{default:Object(n["withCtx"])((function(t){return[Object(n["createElementVNode"])("a",{class:"table-a",href:e.urlPath+t.row.resume,download:"resume"},"简历",8,u)]})),_:1}),Object(n["createVNode"])(V,{label:"简历是否合格",width:"120"},{default:Object(n["withCtx"])((function(t){return[Object(n["createElementVNode"])("span",null,Object(n["toDisplayString"])(e.obj[t.row.rqualified]),1)]})),_:1}),Object(n["createVNode"])(V,{label:"简历反馈",prop:"rfeedback",width:"300"}),Object(n["createVNode"])(V,{label:"面试时间",prop:"atimes",width:"120"}),Object(n["createVNode"])(V,{label:"面试结果",width:"120"},{default:Object(n["withCtx"])((function(t){return[Object(n["createElementVNode"])("span",null,Object(n["toDisplayString"])(e.obj[t.row.aresult]),1)]})),_:1}),Object(n["createVNode"])(V,{label:"录用结果",width:"120"},{default:Object(n["withCtx"])((function(t){return[Object(n["createElementVNode"])("span",null,Object(n["toDisplayString"])(e.obj[t.row.emresult]),1)]})),_:1}),Object(n["createVNode"])(V,{label:"面试评价",prop:"cevaluate",width:"300"}),Object(n["createVNode"])(V,{label:"录用情况反馈",prop:"emfeedback",width:"300"})]})),_:1},8,["onRowClick","data","row-class-name"]),Object(n["createVNode"])(w,{currentPage:e.paginate.page,"onUpdate:currentPage":t[0]||(t[0]=function(t){return e.paginate.page=t}),"page-sizes":[8,12,15,20],"page-size":e.paginate.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total,onSizeChange:e.handleSizeChange,onCurrentChange:e.handleCurrentChange},null,8,["currentPage","page-size","total","onSizeChange","onCurrentChange"]),Object(n["createVNode"])(_,{modelValue:e.dialogVisible,"onUpdate:modelValue":t[12]||(t[12]=function(t){return e.dialogVisible=t}),title:"面试结果编辑",width:"55%"},{footer:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("span",d,[Object(n["createVNode"])(k,{onClick:t[11]||(t[11]=function(t){return e.dialogVisible=!1})},{default:Object(n["withCtx"])((function(){return[b]})),_:1}),Object(n["createVNode"])(k,{type:"primary",onClick:e.handlerAuditionEditSubmit},{default:Object(n["withCtx"])((function(){return[j]})),_:1},8,["onClick"])])]})),default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(E,{model:e.auditionEditForm,"label-position":"top"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(g,{label:"日期时间"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(C,{disabled:"",modelValue:e.auditionEditForm.times,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.auditionEditForm.times=t})},null,8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"面试者姓名"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(C,{disabled:"",modelValue:e.auditionEditForm.aname,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.auditionEditForm.aname=t})},null,8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"面试者手机号码"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(C,{disabled:"",modelValue:e.auditionEditForm.aphone,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.auditionEditForm.aphone=t})},null,8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"简历是否合格"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(v,{modelValue:e.auditionEditForm.rqualified,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.auditionEditForm.rqualified=t}),placeholder:"请选择"},{default:Object(n["withCtx"])((function(){return[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.rqualifiedObj,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])(N,{key:"rqualified"+t,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"简历反馈"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(C,{type:"textarea",modelValue:e.auditionEditForm.rfeedback,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.auditionEditForm.rfeedback=t})},null,8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"面试时间"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(x,{modelValue:e.auditionEditForm.atimes,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.auditionEditForm.atimes=t}),type:"date",placeholder:"请选择面试时间"},null,8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"面试结果"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(v,{modelValue:e.auditionEditForm.aresult,"onUpdate:modelValue":t[7]||(t[7]=function(t){return e.auditionEditForm.aresult=t}),placeholder:"请选择"},{default:Object(n["withCtx"])((function(){return[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.rqualifiedObj,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])(N,{key:"eresult"+t,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"录用结果"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(v,{modelValue:e.auditionEditForm.emresult,"onUpdate:modelValue":t[8]||(t[8]=function(t){return e.auditionEditForm.emresult=t}),placeholder:"请选择"},{default:Object(n["withCtx"])((function(){return[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.rqualifiedObj,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])(N,{key:"emresult"+t,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"面试评价"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(C,{type:"textarea",modelValue:e.auditionEditForm.cevaluate,"onUpdate:modelValue":t[9]||(t[9]=function(t){return e.auditionEditForm.cevaluate=t})},null,8,["modelValue"])]})),_:1}),Object(n["createVNode"])(g,{label:"录用情况反馈"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(C,{type:"textarea",modelValue:e.auditionEditForm.emfeedback,"onUpdate:modelValue":t[10]||(t[10]=function(t){return e.auditionEditForm.emfeedback=t})},null,8,["modelValue"])]})),_:1})]})),_:1},8,["model"])]})),_:1},8,["modelValue"])])}var m=a("2de2"),f=a("3ef4"),s=a("f597"),p=Object(n["defineComponent"])({setup:function(){var e={},t=[{value:0,label:"合格"},{value:1,label:"不合格"}],a=Object(n["ref"])({}),o=m["b"],l=Object(n["reactive"])({page:1,limit:8}),c={0:"合格",1:"不合格"},r=Object(n["ref"])(!1),i=Object(n["ref"])(),u=Object(n["ref"])(),d=Object(n["ref"])(),b=function(e){l.limit=e,l.page=1,p()},j=function(e){l.page=e,p()},O=function(e){e.row;var t=e.rowIndex;return t%2==0?"even-row":t%2==1?"odd-row":""},p=function(){var t=Object.assign({},l,e);Object(s["a"])(t).then((function(e){e.data.code===m["a"]?(u.value=e.data.data,d.value=e.data.count):f["a"].warning(e.data.msg)})).catch((function(e){console.log(e)})),Object(s["c"])().then((function(e){e.data.code===m["a"]?(a.value=e.data.data,console.log(a.value)):Object(f["a"])(e.data.msg)})).catch((function(e){console.log(e)}))},V=function(e){var t=e.aid;Object(s["e"])(t).then((function(e){e.data.code===m["a"]?(i.value=e.data.data,r.value=!0):f["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))},h=function(){Object(s["d"])(i.value).then((function(e){e.data.code===m["a"]?(f["a"].success(e.data.msg),r.value=!1,p()):f["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))};return Object(n["onMounted"])((function(){p()})),{auditionTable:u,urlPath:o,paginate:l,total:d,dialogVisible:r,auditionEditForm:i,rqualifiedObj:t,obj:c,echartData:a,tableRowClassName:O,handleSizeChange:b,handleCurrentChange:j,handlerTableRowClick:V,handlerAuditionEditSubmit:h}}}),V=(a("bebd"),a("6b0d")),h=a.n(V);const w=h()(p,[["render",O]]);t["default"]=w},f597:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return c})),a.d(t,"e",(function(){return r})),a.d(t,"d",(function(){return i})),a.d(t,"c",(function(){return u}));var n=a("e293"),o="/admin/audition";function l(e){return n["a"].post(o,e)}function c(e){return n["a"].get(o,{params:e})}function r(e){return n["a"].get(o+"/"+e)}function i(e){return n["a"].put(o+"/1",e)}function u(){return n["a"].get(o+"/new")}}}]);
//# sourceMappingURL=chunk-a841d076.3fa00908.js.map