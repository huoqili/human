(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-da7b6d1a"],{"7ffa":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),c=Object(a["createTextVNode"])("搜索"),r=Object(a["createTextVNode"])("编辑"),o=Object(a["createTextVNode"])("删除"),u=Object(a["createElementVNode"])("span",null,"您确定要删除么",-1),l={class:"dialog-footer"},i=Object(a["createTextVNode"])("取消"),d=Object(a["createTextVNode"])("确定");function b(e,t,n,b,f,j){var O=Object(a["resolveComponent"])("el-input"),p=Object(a["resolveComponent"])("el-form-item"),s=Object(a["resolveComponent"])("el-button"),m=Object(a["resolveComponent"])("el-form"),g=Object(a["resolveComponent"])("el-table-column"),h=Object(a["resolveComponent"])("router-link"),C=Object(a["resolveComponent"])("el-table"),V=Object(a["resolveComponent"])("el-pagination"),N=Object(a["resolveComponent"])("el-dialog");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createElementVNode"])("div",null,[Object(a["createVNode"])(m,{inline:!0,model:e.searchForm},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(p,{label:"合同编号"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(O,{modelValue:e.searchForm.cid,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.searchForm.cid=t})},null,8,["modelValue"])]})),_:1}),Object(a["createVNode"])(p,{label:"合同名称"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(O,{modelValue:e.searchForm.cname,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.searchForm.cname=t})},null,8,["modelValue"])]})),_:1}),Object(a["createVNode"])(p,null,{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(s,{type:"primary",onClick:e.handlerSearchSubmit},{default:Object(a["withCtx"])((function(){return[c]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"]),Object(a["createVNode"])(C,{data:e.contractTable,border:""},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(g,{label:"合同编号",prop:"cid"}),Object(a["createVNode"])(g,{label:"合同类型"},{default:Object(a["withCtx"])((function(t){return[Object(a["createElementVNode"])("span",null,Object(a["toDisplayString"])(e.typeObj[t.row.ctype]),1)]})),_:1}),Object(a["createVNode"])(g,{label:"合同名称",prop:"cname"}),Object(a["createVNode"])(g,{label:"起始日期",prop:"start"}),Object(a["createVNode"])(g,{label:"终止日期",prop:"end"}),Object(a["createVNode"])(g,{label:"试用期",prop:"try"}),Object(a["createVNode"])(g,{label:"签订甲方",prop:"Aparty"}),Object(a["createVNode"])(g,{label:"签订乙方",prop:"staff.sname"}),Object(a["createVNode"])(g,{label:"操作",width:"175"},{default:Object(a["withCtx"])((function(t){return[Object(a["createVNode"])(h,{to:{name:"contractedit",query:{cid:t.row.cid}}},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(s,{type:"success"},{default:Object(a["withCtx"])((function(){return[r]})),_:1})]})),_:2},1032,["to"]),Object(a["createVNode"])(s,{type:"danger",onClick:function(n){return e.handlerContractDeleteBtn(t.row.cid)}},{default:Object(a["withCtx"])((function(){return[o]})),_:2},1032,["onClick"])]})),_:1})]})),_:1},8,["data"])]),Object(a["createVNode"])(V,{currentPage:e.paginate.page,"onUpdate:currentPage":t[2]||(t[2]=function(t){return e.paginate.page=t}),"page-sizes":[5,10,15,20],"page-size":e.paginate.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total,onSizeChange:e.handleSizeChange,onCurrentChange:e.handleCurrentChange},null,8,["currentPage","page-size","total","onSizeChange","onCurrentChange"]),Object(a["createVNode"])(N,{modelValue:e.editDeleteDialog,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.editDeleteDialog=t}),title:"合同删除",width:"30%"},{footer:Object(a["withCtx"])((function(){return[Object(a["createElementVNode"])("span",l,[Object(a["createVNode"])(s,{onClick:t[3]||(t[3]=function(t){return e.editDeleteDialog=!1})},{default:Object(a["withCtx"])((function(){return[i]})),_:1}),Object(a["createVNode"])(s,{type:"warning",onClick:e.handlerContractDeleteSubmit},{default:Object(a["withCtx"])((function(){return[d]})),_:1},8,["onClick"])])]})),default:Object(a["withCtx"])((function(){return[u]})),_:1},8,["modelValue"])],64)}var f=n("eeea"),j=n("2de2"),O=n("3ef4"),p=n("93c8"),s=Object(a["defineComponent"])({setup:function(){var e=Object(a["reactive"])({cid:"",cname:""}),t=Object(a["ref"])(),n=Object(a["ref"])(),c=Object(a["reactive"])({1:"固定期限",2:"非固定期限",3:"以完成一定工作任务为限",4:"外聘合同",5:"劳务派遣合同"}),r=Object(a["reactive"])({page:1,limit:5}),o=Object(a["ref"])(),u=function(e){r.limit=e,r.page=1,g()},l=function(e){r.page=e,g()},i=function(){r.page=1,g()},d=Object(a["ref"])(!1),b=Object(a["ref"])(0),s=function(e){b.value=e,d.value=!0},m=function(){Object(f["a"])(b.value).then((function(e){e.data.code===j["a"]?(O["a"].success(e.data.msg),r.page=1,g(),d.value=!1):O["a"].warning(e.data.msg)})).catch((function(e){console.log(e)}))},g=function(){var a=Object.assign({},r,e);Object(p["d"])().then((function(e){e.data.code===j["a"]?n.value=e.data.data:O["a"].warning(e.data.msg)})).catch((function(e){console.log(e)})),Object(f["d"])(a).then((function(e){e.data.code===j["a"]&&(t.value=e.data.data,o.value=e.data.count)})).catch((function(e){console.log(e)}))};return Object(a["onMounted"])((function(){g()})),{searchForm:e,contractTable:t,handleSizeChange:u,handleCurrentChange:l,handlerSearchSubmit:i,paginate:r,typeObj:c,editDeleteDialog:d,total:o,handlerContractDeleteBtn:s,handlerContractDeleteSubmit:m,handlerStaffList:p["d"]}}}),m=n("6b0d"),g=n.n(m);const h=g()(s,[["render",b]]);t["default"]=h},"93c8":function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"f",(function(){return u})),n.d(t,"b",(function(){return l})),n.d(t,"e",(function(){return i})),n.d(t,"g",(function(){return d})),n.d(t,"d",(function(){return b})),n.d(t,"a",(function(){return f})),n.d(t,"h",(function(){return j}));var a=n("e293"),c="/admin/staff",r="/admin/stafflist";function o(e){return a["a"].post(c,e)}function u(e){return a["a"].get(c,{params:e})}function l(e){return a["a"].delete(c+"/"+e)}function i(e){return a["a"].get(c+"/"+e)}function d(e,t){return a["a"].put(c+"/"+e,t)}function b(){return a["a"].get(c+"/new")}function f(e){return a["a"].get(c+"/"+e+"/edit")}function j(e){return a["a"].get(r+"/"+e)}},eeea:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return l})),n.d(t,"e",(function(){return i}));var a=n("e293"),c="/admin/contract";function r(e){return a["a"].post(c,e)}function o(e){return a["a"].get(c,{params:e})}function u(e){return a["a"].delete(c+"/"+e)}function l(e){return a["a"].get(c+"/"+e)}function i(e,t){return a["a"].put(c+"/"+e,t)}}}]);
//# sourceMappingURL=chunk-da7b6d1a.fe587252.js.map