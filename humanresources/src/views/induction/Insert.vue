<template>
  <div class="inductionForm-box">
    <h2 style="margin-bottom: 20px; text-align: center">基本信息</h2>
    <hr />
    <el-form
      inline="true"
      :model="inductionForm"
      ref="inductionformdom"
      :rules="inductionRules"
    >
      <el-form-item label="职工姓名" prop="sname">
        <el-input v-model="inductionForm.sname"></el-input>
      </el-form-item>
      <el-form-item label="职工部门" prop="did">
        <el-select
          v-model="inductionForm.did"
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
        <el-select v-model="inductionForm.pid" placeholder="请选择职工职位">
          <el-option
            v-for="item in positionList"
            :key="'position' + item.pid"
            :label="item.pname"
            :value="item.pid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职工编号" prop="snumber">
        <el-input v-model="inductionForm.snumber"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="sinduction">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="inductionForm.sinduction"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="职工电话" prop="phone">
        <el-input v-model="inductionForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="职工邮箱" prop="email">
        <el-input v-model="inductionForm.email"></el-input>
      </el-form-item>
      <h2 style="margin-bottom: 20px; text-align: center">个人信息</h2>
      <hr />
      <el-form-item label="证件类型" prop="documenttype">
        <el-select
          v-model="inductionForm.documenttype"
          @change="setdocumentType"
          placeholder="请选择证件类型"
        >
          <el-option
            v-for="item in documentTypeForm"
            :key="'posttransfer' + item.id"
            :label="item.names"
            :value="item.names"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="documentTypeVisible">
        <el-input v-model="otherdocumentType"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="documentphone">
        <el-input v-model="inductionForm.documentphone"></el-input>
      </el-form-item>
      <el-form-item label="职工性别" prop="ssex">
        <el-select v-model="inductionForm.ssex" placeholder="请选择职工性别">
          <el-option
            v-for="item in sexList"
            :key="'ssex' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职工政治面貌" prop="spolitical">
        <el-select
          v-model="inductionForm.spolitical"
          placeholder="请选择职工政治面貌"
        >
          <el-option
            v-for="item in politicalList"
            :key="'spolitical' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族" prop="snation">
        <el-select
          v-model="inductionForm.snation"
          placeholder="请输入职工民族"
          filterable
        >
          <el-option
            v-for="item in nationForm"
            :key="'spolitical' + item.id"
            :label="item.value"
            :value="item.names"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-cascader
        placeholder="请选择地址"
          v-model="state.value"
          :options="state.options"
          :props="{ expandTrigger: 'hover' }"
          clearable
          filterable
        >
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-input :rows="2" type="textarea" v-model="otheaddress" placeholder="请输入详细地址"></el-input>
      </el-form-item>

      <el-form-item label="婚姻状况" prop="smarriage">
        <el-select
          v-model="inductionForm.smarriage"
          placeholder="请选择婚姻状况"
        >
          <el-option
            v-for="item in smarriageForm"
            :key="'spolitical' + item.id"
            :label="item.value"
            :value="item.names"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="个人社保账号" prop="socialsecurity">
        <el-input v-model="inductionForm.socialsecurity"></el-input>
      </el-form-item>
      <el-form-item label="个人公积金账号" prop="saccumulationfund">
        <el-input v-model="inductionForm.saccumulationfund"></el-input>
      </el-form-item>
      <h2 style="margin-bottom: 20px; text-align: center">学历信息</h2>
      <hr />
      <el-form-item label="最高学历" prop="seducation">
        <el-select v-model="inductionForm.seducation" placeholder="请选择学历">
          <el-option
            v-for="item in educationList"
            :key="'seducation' + item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="毕业院校" prop="school">
        <el-input v-model="inductionForm.school"></el-input>
      </el-form-item>
      <el-form-item label="所学专业" prop="smajor">
        <el-input v-model="inductionForm.smajor"></el-input>
      </el-form-item>

      <el-form-item label="毕业时间" prop="sgraduation">
        <el-col :span="11">
          <el-date-picker
            type="month"
            placeholder="选择日期"
            v-model="inductionForm.sgraduation"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <h2 style="margin-bottom: 20px; text-align: center">银行卡信息</h2>
      <hr />
      <el-form-item label="银行卡号">
        <el-input v-model="inductionForm.backcardnum"></el-input>
      </el-form-item>
      <el-form-item label="开户银行" prop="back">
        <el-input v-model="inductionForm.back"></el-input>
      </el-form-item>
      <h2 style="margin-bottom: 20px; text-align: center">联系人信息</h2>
      <hr />
      <el-form-item label="联系人姓名" prop="linkman">
        <el-input v-model="inductionForm.linkman"></el-input>
      </el-form-item>
      <el-form-item label="关系" prop="relation">
        <el-input v-model="inductionForm.relation"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="linkmanphone">
        <el-input v-model="inductionForm.linkmanphone"></el-input>
      </el-form-item>
    </el-form>
    <h2 style="margin: 20px 0; text-align: center">
      <el-button type="primary" @click="handlerinductionSubmit">提交</el-button>
    </h2>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { SUCCESS } from "@/config";
import { defineComponent, onMounted, reactive, ref, Ref } from "vue";
import { InductionForm } from "../../type/induction";
import { PositionList } from "../../type/position";
import { DepartmentTable } from "../../type/department";
import { handlerDepartmentList } from "../../http/department";
import { handlerGetPositionList } from "../../http/position";
import { DropDownMenuArr } from "../../type/base";
import { handlerInductionformInsert } from "../../http/induction";
import {
  handlerSexQuery,
  handlerPoliticalQuery,
  handlerEducationQuery,
} from "../../http/normalInfo";

export default defineComponent({
  setup() {
    let inductionForm = reactive<InductionForm>({
      sname: "张三",
      did: "1",
      pid: "1",
      phone: "18765453212",
      email: "1765323456@qq.com",
      snumber: "kj2021",
      sinduction: "2021-02-10",
      documenttype: "身份证",
      documentphone: "134987199860987176",
      ssex: "1",
      spolitical: "1",
      snation: "汉族",
      address: "北京市朝阳区金盏乡超越农村101",
      smarriage: "未婚",
      socialsecurity: "134987199860987176",
      saccumulationfund: "134987199860987176",
      seducation: "1",
      school: "华中科技大学",
      smajor: "计算机科学",
      sgraduation: "2021-07-28",
      backcardnum: "63498719986098716",
      back: "招行银行",
      linkman: "中青",
      relation: "父子",
      linkmanphone: "19087675432",
    });
    // 数据验证
    let inductionRules = {
      sname: [{ required: true, message: "必填", trigger: "blur" }],
      did: [{ required: true, message: "必填", trigger: "blur" }],
      pid: [{ required: true, message: "必填", trigger: "blur" }],
      phone: [{ required: true, message: "必填", trigger: "blur" }],
      email: [{ required: true, message: "必填", trigger: "blur" }],
      snumber: [{ required: true, message: "必填", trigger: "blur" }],
      sinduction: [{ required: true, message: "必填", trigger: "blur" }],
      documenttype: [{ required: true, message: "必填", trigger: "blur" }],
      documentphone: [{ required: true, message: "必填", trigger: "blur" }],
      ssex: [{ required: true, message: "必填", trigger: "blur" }],
      spolitical: [{ required: true, message: "必填", trigger: "blur" }],
      snation: [{ required: true, message: "必填", trigger: "blur" }],
      address: "",
      smarriage: [{ required: true, message: "必填", trigger: "blur" }],
      socialsecurity: [{ required: true, message: "必填", trigger: "blur" }],
      saccumulationfund: [{ required: true, message: "必填", trigger: "blur" }],
      seducation: [{ required: true, message: "必填", trigger: "blur" }],
      school: [{ required: true, message: "必填", trigger: "blur" }],
      smajor: [{ required: true, message: "必填", trigger: "blur" }],
      sgraduation: [{ required: true, message: "必填", trigger: "blur" }],
      backcardnum: [{ required: true, message: "必填", trigger: "blur" }],
      back: [{ required: true, message: "必填", trigger: "blur" }],
      linkman: [{ required: true, message: "必填", trigger: "blur" }],
      relation: [{ required: true, message: "必填", trigger: "blur" }],
      linkmanphone: [{ required: true, message: "必填", trigger: "blur" }],
    };
    // 证旧类型
    let documentTypeVisible = ref(false);
    let otherdocumentType: Ref = ref();
    let documentTypeForm = reactive([
      { id: "1", names: "身份证" },
      { id: "2", names: "军官证" },
      { id: "3", names: "护照" },
      { id: "4", names: "台胞证" },
      { id: "5", names: "其他" },
    ]);
    let inductionformdom: Ref = ref();
    // 详细地址
    let otheaddress: Ref = ref();
    // 初始化部门  岗位下拉菜单
    let departmentList = ref<DepartmentTable>();
    let positionList = ref<PositionList>();
    // 地址
    const state = reactive({
      value: [],
      options: [
        {
          value: "北京市",
          label: "北京市",
          children: [
            {
              value: "北京市",
              label: "北京市",
              children: [
                {
                  value: "东城区",
                  label: "东城区",
                },
                {
                  value: "西城区",
                  label: "西城区",
                },
                {
                  value: "朝阳区",
                  label: "朝阳区",
                },
                {
                  value: "丰台区",
                  label: "丰台区",
                },
                {
                  value: "石景山区",
                  label: "石景山区",
                },
                {
                  value: "石景山区",
                  label: "石景山区",
                },
              ],
            },
          ],
        },
        {
          value: "天津市",
          label: "天津市",
          children: [
            {
              value: "天津市",
              label: "天津市",
              children: [
                {
                  value: "和平区",
                  label: "和平区",
                },
                {
                  value: "河东区",
                  label: "河东区",
                },
                {
                  value: "河西区",
                  label: "河西区",
                },
                {
                  value: "南开区",
                  label: "南开区",
                },
              ],
            },
          ],
        },
        {
          value: "山西省",
          label: "山西省",
          children: [
            {
              value: "太原市",
              label: "太原市",
              children: [
                {
                  value: "小店区",
                  label: "小店区",
                },
                {
                  value: "迎泽区",
                  label: "迎泽区",
                },
                {
                  value: "杏花岭区",
                  label: "杏花岭区",
                },
                {
                  value: "万柏林区",
                  label: "万柏林区",
                },
                {
                  value: "晋源区",
                  label: "晋源区",
                }
              ],
            }
          ],
        },
      ],
    });
    // 性别、政治面貌、学历 、民族、婚姻状况、
    let sexList = ref<DropDownMenuArr>();
    let educationList = ref<DropDownMenuArr>();
    let politicalList = ref<DropDownMenuArr>();
    let nationForm = reactive([
      { id: "1", names: "汉族" },
      { id: "2", names: "藏族" },
      { id: "3", names: "回族" },
      { id: "4", names: "维吾尔族" },
      { id: "5", names: "白族" },
      { id: "6", names: "朝鲜族" },
      { id: "7", names: "壮族" },
    ]);
    let smarriageForm = reactive([
      { id: "1", names: "未婚" },
      { id: "2", names: "已婚" },
      { id: "3", names: "已婚已孕" },
      { id: "4", names: "离异" },
    ]);

    let initData = () => {
      // 获取性别,部门,学历，政治面貌下拉列表
      Promise.all([
        handlerDepartmentList(),
        handlerPoliticalQuery(),
        handlerSexQuery(),
        handlerEducationQuery(),
      ])
        .then((res) => {
          departmentList.value = res[0].data.data as DepartmentTable;
          politicalList.value = res[1].data.data as DropDownMenuArr;
          sexList.value = res[2].data.data as DropDownMenuArr;
          educationList.value = res[3].data.data as DropDownMenuArr;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    let handlerPositionList = () => {
      handlerGetPositionList(inductionForm.did)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            positionList.value = res.data.data as PositionList;
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 身份证类型输入框显示隐藏
    let setdocumentType = () => {
      if (inductionForm.documenttype === "其他") {
        documentTypeVisible.value = true;
      } else {
        documentTypeVisible.value = false;
      }
    };
    //提交----------------------------------------
    let handlerinductionSubmit = () => {
      inductionformdom.value.validate((valid: boolean) => {
        if (inductionForm.documenttype === "其他") {
          inductionForm.documenttype = otherdocumentType.value;
        }
        inductionForm.address = state.value+otheaddress.value
        if (!valid) return;
        handlerInductionformInsert(inductionForm)
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
      });
    };
    onMounted(() => {
      initData();
    });
    return {
      state,
      otheaddress,
      inductionRules,
      sexList,
      educationList,
      politicalList,
      nationForm,
      smarriageForm,
      inductionForm,
      departmentList,
      positionList,
      inductionformdom,
      initData,
      handlerPositionList,
      documentTypeVisible,
      otherdocumentType,
      setdocumentType,
      documentTypeForm,
      handlerinductionSubmit,
    };
  },
});
</script>

<style scoped>
.inductionForm-box {
  margin-left: 20px;
}
hr {
  /*透明渐变水平线*/
  width: 90%;
  margin: 0 auto;
  border: 0;
  height: 2px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgb(95, 164, 232),
    rgba(0, 0, 0, 0)
  );
}

.el-form--inline .el-form-item {
  margin-top: 10px;
}
.el-form--inline .el-form-item >>> .el-input__inner {
  border-left: 0;
  border-right: 0;
  border-top: 0;
}
</style>