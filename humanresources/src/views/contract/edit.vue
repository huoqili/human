<template>
  <div>
    <el-form :model="contractForm">
      <el-form-item label="合同编号">
        <el-input
          v-model="contractForm.cid"
          disabled
          placeholder="自动生成无需填写"
        />
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="contractForm.ctype" placeholder="请选择合同类型">
          <el-option
            v-for="item in typeList"
            :key="'ctype' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同名称">
        <el-input
          v-model="contractForm.cname"
          placeholder="请输入合同名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="合同起始日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="contractForm.start"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="合同终止日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="contractForm.end"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="试用期（天）">
        <el-input
          v-model="contractForm.try"
          placeholder="请输入试用期的天数"
        ></el-input>
      </el-form-item>
      <el-form-item label="签订甲方">
        <el-input
          v-model="contractForm.Aparty"
          placeholder="请输入签订甲方"
        ></el-input>
      </el-form-item>
      <el-form-item label="签订乙方">
        <el-select
          v-model="contractForm.sid"
          filterable
          placeholder="请选择乙方的姓名"
        >
          <el-option
            v-for="item in staffList"
            :key="'staff' + item.sid"
            :label="item.sname"
            :value="item.sid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ContractForm } from "../../type/contract";
import { DropDownMenuArr } from "../../type/base";
import { SUCCESS } from "@/config";
import { ElMessage } from "element-plus";
import {
  handlerContractShow,
  handlerContractUpdate,
} from "../../http/contract";
import { handlerTypeQuery } from "../../http/normalInfo";
import { handlerStaffList } from "../../http/staff";
import { StaffTable } from "../../type/staff";

export default defineComponent({
  setup() {
    let route = useRoute();
    // 表单
    let contractForm = ref<ContractForm>({
      ctype: 1,
      cname: "",
      start: "",
      end: "",
      try: "",
      Aparty: "",
      // Bparty:'',
      sid: "",
    });
    // 类型
    let typeList = ref<DropDownMenuArr>();
    // 乙方的姓名
    let staffList = ref<StaffTable>();
    // 提交
    let handlerSubmit = () => {
      handlerContractUpdate(
        contractForm.value.cid as string,
        contractForm.value
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
    };
    //   初始化
    let initData = () => {
      let cid = route.query.cid as string;
      handlerContractShow(cid)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            contractForm.value = res.data.data as ContractForm;
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      Promise.all([handlerTypeQuery(), handlerStaffList()])
        .then((res) => {
          console.log("res" + res);
          staffList.value = res[1].data.data as StaffTable;
          typeList.value = res[0].data.data as DropDownMenuArr;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      initData();
    });
    return {
      contractForm,
      typeList,
      handlerSubmit,
      staffList,
    };
  },
});
</script>

<style scoped>
</style>