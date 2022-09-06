<template>
  <div>
    <el-form
      :model="posttransferForm"
      :rules="posttransferRules"
      ref="posttransferformdom"
    >
      <el-form-item label="申请时间" prop="filingdate">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="posttransferForm.filingdate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="职工编号" prop="snumber">
        <el-input v-model="posttransferForm.snumber"></el-input>
      </el-form-item>
      <el-form-item label="职工姓名" prop="sname">
        <el-input v-model="posttransferForm.sname"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="sinduction">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="posttransferForm.sinduction"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form :inline="true">
        <el-form-item label="职工部门" prop="did">
          <el-select
            v-model="posttransferForm.did"
            placeholder="请选择职工部门"
            @change="handlerPositionList"
          >
            <el-option
              v-for="item in departmentList"
              :key="'department' + item.did"
              :label="item.dname"
              :value="item.did"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职工职位" prop="did">
          <el-select
            v-model="posttransferForm.pid"
            placeholder="请选择职工职位"
          >
            <el-option
              v-for="item in positionList"
              :key="'position' + item.pid"
              :label="item.pname"
              :value="item.pid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form-item label="转岗原因" prop="did">
        <el-select
          v-model="posttransferForm.ptreason"
          @change="setPtreason"
          placeholder="请选择转岗原因"
        >
          <el-option
            v-for="item in ptreasonForm"
            :key="'posttransfer' + item.id"
            :label="item.names"
            :value="item.names"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="ptreasonVisible">
        <el-input v-model="otherptreason"></el-input>
      </el-form-item>
      <el-form :inline="true">
        <el-form-item label="转入部门">
          <el-select
            v-model="posttransferForm.newdid"
            placeholder="请选择转入部门"
            @change="handlerPositionList"
          >
            <el-option
              v-for="item in departmentList"
              :key="'department' + item.did"
              :label="item.dname"
              :value="item.did"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转入职位">
          <el-select
            v-model="posttransferForm.newpid"
            placeholder="请选择转入职工职位"
          >
            <el-option
              v-for="item in positionList"
              :key="'position' + item.pid"
              :label="item.pname"
              :value="item.pid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button type="primary" @click="handlerPosttransferSubmit"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref } from "vue";
import { PosttransferForm } from "@/type/posttransfer";
import { ElMessage } from "element-plus";
import { SUCCESS } from "@/config";
import {handlerPosttransferShow,handlerPosttransferUpdate } from "@/http/posttransfer";
import { PositionList } from "../../type/position";
import { DepartmentTable } from "../../type/department";
import { handlerDepartmentList } from "../../http/department";
import { handlerGetPositionList } from "../../http/position";
import { useRoute } from "vue-router";
export default defineComponent({
  data() {
    return {};
  },
  setup() {
    let route = useRoute();
    let posttransferForm = ref<PosttransferForm>({
      sname: "",
      did: "",
      pid: "",
      filingdate: "",
      snumber: "",
      sinduction: "",
      newdid: "",
      newpid: "",
      ptreason: "",
    });
    let posttransferRules = {
      sname: [
        { required: true, message: "员工姓名", trigger: "blur" },
        { min: 1, max: 20, message: "长度在1-11个字符", trigger: "blur" },
      ],
      did: [{ required: true, message: "所属部门必填", trigger: "blur" }],
      pid: [
        { required: true, message: "所属岗位必填", trigger: "blur" },
        { min: 1, max: 20, message: "长度在1-20个字符", trigger: "blur" },
      ],
      filingdate: [
        { required: true, message: "申请调岗时间必填", trigger: "blur" },
      ],
      snumber: [{ required: true, message: "员工编号必填", trigger: "blur" }],
      sinduction: [
        { required: true, message: "入职时间必填", trigger: "blur" },
      ],
      newdid: [{ required: true, message: "转入部门必填", trigger: "blur" }],
      newpid: [{ required: true, message: "转入职位必填", trigger: "blur" }],
      ptreason: [{ required: true, message: "调岗原因必填", trigger: "blur" }],
    };
    let ptreasonForm = reactive([
      { id: "1", names: "个人申请" },
      { id: "2", names: "岗位需求" },
      { id: "3", names: "公司安排" },
      { id: "4", names: "其他" },
    ]);
    let posttransferformdom: Ref = ref();
    let otherptreason: Ref = ref();
    // 获取部门和岗位
    let departmentList = ref<DepartmentTable>();
    let positionList = ref<PositionList>();

    let ptreasonVisible = ref(false); //控制输入框显示


    let initData = () => {
      let ptid = route.query.ptid as string;
      
      handlerPosttransferShow(ptid)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            posttransferForm.value = res.data.data as PosttransferForm;
              //判断原因
              let item=ptreasonForm.findIndex(n=>n.names===posttransferForm.value.ptreason)
               if(item<0){
                  otherptreason.value= posttransferForm.value.ptreason
                 posttransferForm.value.ptreason='其他'
                  ptreasonVisible.value=true
               }
                showPosition(posttransferForm.value.did as string)
            }
          })  
    }
      // 部门
      handlerDepartmentList()
        .then((res) => {
          departmentList.value = res.data.data as DepartmentTable;
        })
        .catch((err) => {
          console.log(err);
        });
      let showPosition=(id:string)=>{
        handlerGetPositionList(id)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            // posttransferForm.value.pid = "";
            positionList.value = res.data.data as PositionList;
          
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    let handlerPositionList = () => {
      showPosition(posttransferForm.value.did as string)
    };
    // -------------------------修改--------------------------
    let handlerPosttransferSubmit = () => {
      posttransferformdom.value.validate((valid: boolean) => {
        if (posttransferForm.value.ptreason  === "其他") {
          posttransferForm.value.ptreason = otherptreason.value;
        }
        if (!valid) return;
        handlerPosttransferUpdate(posttransferForm.value.ptid as string,posttransferForm.value)
          .then(res=> {
            if (res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg);
            } else {
              ElMessage.warning(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    };

    let setPtreason = () => {
      if (posttransferForm.value.ptreason === "其他") {
        ptreasonVisible.value = true;
      } else {
        ptreasonVisible.value = false;
      }
    };
    onMounted(() => {
      initData();
    });
    return {
      posttransferForm,
      posttransferRules,
      ptreasonForm,
      posttransferformdom,
      handlerPosttransferSubmit,
      handlerPositionList,
      initData,
      departmentList,
      positionList,
      setPtreason,
      ptreasonVisible,
      otherptreason,
    };

  }    
});
</script>

<style scoped>
</style>