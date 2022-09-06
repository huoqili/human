<template>
  <div class="staff-query">
    <el-form :inline="true" :model="searchFrom">
      <el-form-item label="部门">
        <el-select
          v-model="searchFrom.did"
          clearable
          placeholder="请选择职工职位"
          @change="handlerInductionList"
        >
          <el-option
            v-for="item in departmentList"
            :key="'department' + item.did"
            :label="item.dname"
            :value="item.did"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位">
        <el-select
          v-model="searchFrom.pid"
          clearable
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
      <el-form-item label="职工姓名">
        <el-input v-model="searchFrom.sname"></el-input>
      </el-form-item>
      <el-form-item label="职工编号">
        <el-input v-model="searchFrom.snumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="inductionTable" border>
      <el-table-column fixed="left" label="职工姓名" prop="sname"></el-table-column>
      <el-table-column
        label="职工部门"
        prop="department.dname"
      ></el-table-column>
      <el-table-column label="职工职位" prop="position.pname"></el-table-column>
      <el-table-column label="职工编号" prop="snumber"></el-table-column>
      <el-table-column label="入职时间" prop="sinduction"></el-table-column>
      <el-table-column label="职工电话" prop="phone"></el-table-column>
      <el-table-column label="职工邮箱" prop="email"></el-table-column>
      <el-table-column label="证件类型" prop="documenttype"></el-table-column>
      <el-table-column label="证件号码" prop="documentphone"></el-table-column>
      <el-table-column label="员工性别">
        <template #default="scope">
          <span>{{ sexObj[scope.row.ssex] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="政治面貌">
        <template #default="scope">
          <span>{{ politicalObj[scope.row.spolitical] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="民族" prop="snation"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="婚姻状况" prop="smarriage"></el-table-column>
      <el-table-column
        label="个人社保账号"
        prop="socialsecurity"
      ></el-table-column>
      <el-table-column
        label="个人公积金账号"
        prop="saccumulationfund"
      ></el-table-column>
             <el-table-column label="最高学历">
                <template #default="scope">
                    <span>{{ seducationObj[scope.row.seducation] }}</span>
                </template>
            </el-table-column>
      <el-table-column label="毕业院校" prop="school"></el-table-column>
      <el-table-column label="所学专业" prop="smajor"></el-table-column>
      <el-table-column label="毕业时间" prop="sgraduation"></el-table-column>
      <el-table-column label="银行卡号" prop="backcardnum"></el-table-column>
      <el-table-column label="开户银行" prop="back"></el-table-column>
      <el-table-column label="联系人姓名" prop="linkman"></el-table-column>
      <el-table-column label="关系" prop="relation"></el-table-column>
      <el-table-column label="联系方式" prop="linkmanphone"></el-table-column>

      <el-table-column label="操作" width="210" fixed="right" >
        <template #default="scope">
          <router-link
            :to="{ name: 'inductionedit', query: { inid: scope.row.inid } }"
          >
            <el-button size="mini" type="success">编辑</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="handlerInductionDeleteBtn(scope.row.inid)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="handlerStaffUpdataBtn(scope.row.inid)"
            >同意</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination
    v-model:currentPage="paginate.page"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="paginate.limit"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>

  <el-dialog v-model="editDeleteDialog" title="职工删除" width="30%">
    <span>您确定要删除么</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDeleteDialog = false">取消</el-button>
        <el-button type="warning" @click="handlerInductionfDeleteSubmit"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { Paginate } from "../../type/base";
import { InductionTable } from "../../type/induction";
import {
  handlerInductionTable,
  handlerInductionDelete,
  handlerInStateUpdate,
} from "../../http/induction";
import { SUCCESS } from "@/config";
import { handlerDepartmentList } from "../../http/department";
import { handlerGetPositionList } from "../../http/position";
import { DepartmentTable } from "../../type/department";
import { PositionList } from "../../type/position";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    let sexObj = reactive({
      "1": "男",
      "2": "女",
    });
    let politicalObj = reactive({
      "1": "党员",
      "2": "团员",
      "3": "群众",
      "4": "其他",
    });
    let seducationObj = reactive({
      "1": "硕士",
      "2": "学士",
      "3": "大专",
      "4": "其他",
    });

    let inductionTable = ref<InductionTable>();

    let departmentList = ref<DepartmentTable>();

    let positionList = ref<PositionList>();

    let editDeleteDialog = ref<boolean>(false);
    let editDeleteIdx = ref<number>(0);

    let paginate = reactive<Paginate>({
      page: 1,
      limit: 5,
    });

    let searchFrom = reactive({
      did: "",
      pid: "",
      snumber: "",
      sname: "",
    });

    let total = ref<number>();

    let handleSizeChange = (value: number) => {
      paginate.limit = value;
      paginate.page = 1;
      initData();
    };

    let handleCurrentChange = (value: number) => {
      paginate.page = value;
      initData();
    };

    let handlerSearchSubmit = () => {
      paginate.page = 1;
      initData();
    };
    let handlerInductionList = () => {
      handlerGetPositionList(searchFrom.did)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            searchFrom.pid = "";
            positionList.value = res.data.data as PositionList;
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 点击删除按钮

    let handlerInductionDeleteBtn = (inid: number) => {
      editDeleteIdx.value = inid;
      editDeleteDialog.value = true;
    };
    // 删除确定
    let handlerInductionfDeleteSubmit = () => {
      handlerInductionDelete(editDeleteIdx.value)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            ElMessage.success(res.data.msg);
            paginate.page = 1;
            initData();
            editDeleteDialog.value = false;
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    //   审核同意
    let handlerStaffUpdataBtn = (inid: number) => {
      handlerInStateUpdate(inid)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            ElMessage.success(res.data.msg);
            paginate.page = 1;
            initData();
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    let initData = () => {
      let params = Object.assign({}, paginate, searchFrom);
      handlerDepartmentList()
        .then((res) => {
          if (res.data.code === SUCCESS) {
            departmentList.value = res.data.data as DepartmentTable;
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      handlerInductionTable(params)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            inductionTable.value = res.data.data as InductionTable;
            total.value = res.data.count;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };


    onMounted(() => {
      initData();
    });

    return {
      sexObj,
      politicalObj,
      seducationObj,
      paginate,
      inductionTable,
      searchFrom,
      total,
      departmentList,
      positionList,
      editDeleteDialog,
      handleSizeChange,
      handleCurrentChange,
      handlerInductionList,
      handlerSearchSubmit,
      handlerInductionDeleteBtn,
      handlerInductionfDeleteSubmit,
      handlerStaffUpdataBtn,
    };
  },
});
</script>

<style scoped>
.el-button+.el-button {
    margin-left: 0px;
}</style>
