<template>
  <div>
    <!-- 
            申请日期，【申请人，部门，，职位，工号】，入职日期（入职管理获取）
            试用期（合同管理获取），转正日期，职位，
            试用期工作成果描述，自我综合评价（收获与不足），未来工作计划和目标
            对试用期间对工作感到，对公司人际关系感到，对目前的工作强度感到
            对目前的工作量感到，对目前的工作环境感到，对目前的工作待遇感到
         -->
    <el-form :model="regularizationForm">
      <el-form :inline="true">
        <el-form-item label="职工部门">
          <el-select
            v-model="regularizationForm.did"
            placeholder="请选择职工职位"
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
        <el-form-item label="职工职位">
          <el-select
            v-model="regularizationForm.pid"
            placeholder="请选择职工职位"
            @change="handlerStaffList"
          >
            <el-option
              v-for="item in positionList"
              :key="'position' + item.pid"
              :label="item.pname"
              :value="item.pid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-select v-model="regularizationForm.sid" placeholder="请选择id">
            <el-option
              v-for="item in staffList"
              :key="staff + item.sid"
              :label="item.sname"
              :value="item.sid"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form-item label="申请日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="regularizationForm.applydate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <span class="el-form-item__label">新员工试用期自我考评</span>
      <hr />
      <el-form class="content">
        <div>
          <span class="el-form-item__label">试用期工作成果描述</span>
          <el-form-item>
            <el-input
              v-model="regularizationForm.result"
              maxlength="255"
              placeholder="Please input"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 10 }"
            />
          </el-form-item>
        </div>
        <div>
          <span class="el-form-item__label">自我综合评价（收获与不足）</span>
          <el-form-item>
            <el-input
              v-model="regularizationForm.appraise"
              maxlength="255"
              placeholder="Please input"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 10 }"
            />
          </el-form-item>
        </div>
        <div>
          <span class="el-form-item__label">未来工作计划和目标</span>
          <el-form-item>
            <el-input
              v-model="regularizationForm.plan"
              maxlength="255"
              placeholder="Please input"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 10 }"
            />
          </el-form-item>
        </div>
      </el-form>
      <el-form-item label="试用期间对工作感到">
        <el-select v-model="regularizationForm.forwork" placeholder="请选择">
          <el-option
            v-for="item in workList"
            :key="'forwork' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对公司人际关系感到">
        <el-select v-model="regularizationForm.forpeople" placeholder="请选择">
          <el-option
            v-for="item in peopleList"
            :key="'forpeople' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对目前的工作强度感到">
        <el-select v-model="regularizationForm.forstrength" placeholder="请选择">
          <el-option
            v-for="item in strengthList"
            :key="'forstrength' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对目前的工作量感到">
        <el-select v-model="regularizationForm.forworkload" placeholder="请选择">
          <el-option
            v-for="item in workloadList"
            :key="'forworkload' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对目前的工作环境感到">
        <el-select v-model="regularizationForm.forenvironment" placeholder="请选择">
          <el-option
            v-for="item in environmentList"
            :key="'forenvironment' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对目前的工作待遇感到">
        <el-select v-model="regularizationForm.forpay" placeholder="请选择">
          <el-option
            v-for="item in payList"
            :key="'forpay' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="handlerSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted, ref } from "vue";
import { RegularizationForm } from "../../type/regularization";
import { DepartmentTable } from "../../type/department";


import { handlerDepartmentList } from "../../http/department";
import { PositionList } from "../../type/position";
import { handlerGetPositionList} from "../../http/position";
import { SUCCESS } from "@/config";
import { ElMessage } from "element-plus";
import { StaffTable } from "../../type/staff";
import { handlerGetStaffList } from "../../http/staff";
import { DropDownMenuArr } from "../../type/base";
import { useRoute } from "vue-router";
import {handlerRegularizationShow,handlerRegularizationUpdate} from '../../http/regularization'
import {
  handlerWorkQuery,
  handlerPeopleQuery,
  handlerStrengthQuery,
  handlerWorkloadQuery,
  handlerEnvironmentQuery,
  handlerPayQuery,
} from "../../http/normalInfo";
export default defineComponent({
  setup() {
    let route = useRoute();
    let regularizationForm = ref<RegularizationForm>({
      sid: "",
      did: "",
      pid: "",
      applydate: "",
      result: "",
      appraise: "",
      plan: "",
      forwork: 1,
      forpeople: 1,
      forstrength: 1,
      forworkload: 1,
      forenvironment: 1,
      forpay: 1,
    });
    // 部门
    let departmentList = ref<DepartmentTable>();

    // 职位
    let positionList = ref<PositionList>();
    let handlerPositionList = () => {
      // console.log(regularizationForm.value.did,11111122);
      handlerGetPositionList(regularizationForm.value.did)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            regularizationForm.value.pid = "";
            positionList.value = res.data.data as PositionList;
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 员工
    let staffList = ref<StaffTable>();
    let handlerStaffList = () => {
      handlerGetStaffList(regularizationForm.value.pid)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            regularizationForm.value.sid = "";
            staffList.value = res.data.data as StaffTable;
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 评价
    let workList = ref<DropDownMenuArr>();
    let peopleList = ref<DropDownMenuArr>();
    let strengthList = ref<DropDownMenuArr>();
    let workloadList = ref<DropDownMenuArr>();
    let environmentList = ref<DropDownMenuArr>();
    let payList = ref<DropDownMenuArr>();
    // 提交
    let handlerSubmit=()=>{
        handlerRegularizationUpdate(
        regularizationForm.value.rid as string,
        regularizationForm.value
      )
        .then((res) => {
          if (res.data.code === SUCCESS) {
            ElMessage.success(res.data.msg);
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    let initData = () => {
      let rid=route.query.rid as string;
      console.log('rid:'+rid);
      
      handlerRegularizationShow(rid)
      .then((res)=>{
        if(res.data.code===SUCCESS){
        console.log('res在这里');
          regularizationForm.value=res.data.data as RegularizationForm
          let pid=regularizationForm.value.pid;
          let sid=regularizationForm.value.sid;
          handlerPositionList();
          handlerStaffList();
          setTimeout(()=>{
            regularizationForm.value.pid=pid;
          },100)
          setTimeout(()=>{
            regularizationForm.value.sid=sid;
          },150)
        }
        else{
          ElMessage.warning(res.data.msg)
        }
      }).catch((err)=>{
        console.log('错误：'+err);
        
      })
      Promise.all([
        handlerDepartmentList(),
        // handlerStaffList(),
        handlerWorkQuery(),
        handlerPeopleQuery(),
        handlerStrengthQuery(),
        handlerWorkloadQuery(),
        handlerEnvironmentQuery(),
        handlerPayQuery(),
        
      ])
        .then((res) => {
          console.log(1111111);
          console.log(res);
          
          departmentList.value = res[0].data.data as DepartmentTable;
          // console.log(positionList.value)
          // staffList.value=res[2].data.data as StaffTable
          workList.value = res[1].data.data as DropDownMenuArr;
          peopleList.value = res[2].data.data as DropDownMenuArr;
          strengthList.value = res[3].data.data as DropDownMenuArr;
          workloadList.value = res[4].data.data as DropDownMenuArr;
          environmentList.value = res[5].data.data as DropDownMenuArr;
          payList.value = res[6].data.data as DropDownMenuArr;
          

        })
        .catch((err) => {
          console.log(2);

          console.log(err);
        });
        // setTimeout(() => {
        //   handlerPositionList().then((res)=>{
        //   positionList.value=res[0].data.data as PositionList;
        //   }).catch((err)=>{
        //     console.log(err);
            
        //   });
        // }, 100);
    };
    onMounted(() => {
      initData();
    });
    return {
      regularizationForm,
      handlerPositionList,
      departmentList,
      positionList,
      staffList,
      workList,
      peopleList,
      strengthList,
      workloadList,
      environmentList,
      payList,
      handlerStaffList,
      handlerSubmit,
      
    };
  },
});
</script>

<style scoped>
.content {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.content div {
  width: 500px;
}
</style>