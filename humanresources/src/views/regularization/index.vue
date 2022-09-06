<template>
  <div>
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="姓名">
        <el-select v-model="searchForm.sid" filterable placeholder="请选择姓名">
          <el-option
            v-for="item in staffList"
            :key="'staff' + item.sid"
            :label="item.sname"
            :value="item.sid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正编号">
        <el-input v-model="searchForm.rid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="regularizationTable" border>
      <el-table-column
        label="所属部门"
        prop="department.dname"
      ></el-table-column>
      <el-table-column label="员工职位" prop="position.pname"></el-table-column>
      <el-table-column label="员工姓名" prop="staff.sname"></el-table-column>
      <el-table-column label="申请日期" prop="applydate"></el-table-column>
      <el-table-column
        label="试用期工作成果描述"
        prop="result"
      ></el-table-column>
      <el-table-column label="自我综合评价" prop="appraise"></el-table-column>
      <el-table-column label="未来工作计划和目标" prop="plan"></el-table-column>
      <el-table-column label="试用期间对工作感到">
        <template #default="scope">
          <span>{{ forworkObj[scope.row.forwork] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对公司人际关系感到">
        <template #default="scope">
          <span>{{ forpeopleObj[scope.row.forpeople] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对目前的工作强度感到">
        <template #default="scope">
          <span>{{ forstrengthObj[scope.row.forstrength] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对目前的工作量感到">
        <template #default="scope">
          <span>{{ forworkloadObj[scope.row.forworkload] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对目前的工作环境感到">
        <template #default="scope">
          <span>{{ forenvironmentObj[scope.row.forenvironment] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对目前的工作待遇感到">
        <template #default="scope">
          <span>{{ forpayObj[scope.row.forpay] }}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" width="175">
        <template #default="scope">
          <router-link :to="{ name: 'regularizationedit', query: { rid: scope.row.rid } }">
            <el-button type="success">编辑</el-button>
          </router-link>
          <el-button
            type="danger"
            @click="handlerRegularizationDeleteBtn(scope.row.rid)"
            >删除</el-button
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
  <el-dialog
        v-model="editDeleteDialog"
        title="转正删除"
        width="30%"
    >
        <span>您确定要删除么</span>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="editDeleteDialog = false">取消</el-button>
            <el-button type="warning" @click="handlerRegularizationDeleteSubmit">确定</el-button>
        </span>
        </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { RegularizationTable } from "../../type/regularization";
import { StaffTable } from "../../type/staff";
import { handlerStaffList } from "../../http/staff";
import { ElMessage } from "element-plus";
import { SUCCESS } from "@/config";
import { Paginate } from "../../type/base";
import { handlerRegularizationTable,handlerRegularizationDelete } from "../../http/regularization";
export default defineComponent({
  setup() {
    // 表格
    let regularizationTable = ref<RegularizationTable>();
    // 表单
    let searchForm = reactive({
      sid: "",
      rid: "",
    });
    // 姓名
    let staffList = ref<StaffTable>();
    // 评价
    let forworkObj=reactive({
        '1':"非常满意",
        '2':"还可以",
        '3':'需要改进',
        '4':"不满意"
    })
    let forpeopleObj=reactive({
        '1':"非常融洽",
        '2':"比较友好",
        '3':'沟通不畅',
        '4':"比较紧张"
    })
    let forstrengthObj=reactive({
        '1':"轻松，可以承担更具挑战的工作",
        '2':"合适，可适当加大强度",
        '3':'刚好适合本人目前的能力',
        '4':"不太适应，略感吃力"
    })
    let forworkloadObj=reactive({
        '1':"太多",
        '2':"略多",
        '3':'刚好',
        '4':"太少"
    })
    let forenvironmentObj=reactive({
        '1':"很好",
        '2':"舒适",
        '3':'一般',
        '4':"较差"
    })
    let forpayObj=reactive({
         '1':"很好",
        '2':"舒适",
        '3':'一般',
        '4':"较差"
    })
    // 删除
    let editDeleteDialog = ref<boolean>(false);
    let editDeleteIdx = ref<number>(0);
    let handlerRegularizationDeleteBtn=(rid:number)=>{
        editDeleteIdx.value = rid;
      editDeleteDialog.value = true;
    }


     let handlerRegularizationDeleteSubmit = () => {
      handlerRegularizationDelete(editDeleteIdx.value)
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
    // 分页
    let paginate = reactive<Paginate>({
      page: 1,
      limit: 5,
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
    
    // 初始化
    let initData = () => {
      let params = Object.assign({}, paginate, searchForm);
      handlerStaffList()
        .then((res) => {
          if (res.data.code === SUCCESS) {
            staffList.value = res.data.data as StaffTable;
          } else {
            ElMessage.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      handlerRegularizationTable(params)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            regularizationTable.value = res.data.data as RegularizationTable;
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
      regularizationTable,
      searchForm,
      staffList,
      handlerStaffList,
      handleSizeChange,
      handleCurrentChange,
      forworkObj,
      forstrengthObj,
      forpeopleObj,
      forworkloadObj,
      forenvironmentObj,
      forpayObj,
      handlerSearchSubmit,
      paginate,
      total,
      handlerRegularizationDeleteBtn,
      handlerRegularizationDeleteSubmit,
      editDeleteDialog
    };
  },
});
</script>

<style scoped>
</style>