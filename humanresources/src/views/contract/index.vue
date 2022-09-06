<template>
  <div>
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="合同编号">
        <el-input v-model="searchForm.cid"></el-input>
      </el-form-item>
      <el-form-item label="合同名称">
        <el-input v-model="searchForm.cname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="contractTable" border>
      <el-table-column label="合同编号" prop="cid"> </el-table-column>
      <el-table-column label="合同类型">
        <template #default="scope">
          <span>{{ typeObj[scope.row.ctype] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同名称" prop="cname"> </el-table-column>
      <el-table-column label="起始日期" prop="start"> </el-table-column>
      <el-table-column label="终止日期" prop="end"> </el-table-column>
      <el-table-column label="试用期" prop="try"> </el-table-column>
      <el-table-column label="签订甲方" prop="Aparty"> </el-table-column>
      <!-- <el-table-column label="签订乙方" prop="Bparty"> </el-table-column> -->
      <el-table-column label="签订乙方" prop="staff.sname"></el-table-column>
      <el-table-column label="操作" width="175">
        <template #default="scope">
          <router-link :to="{ name: 'contractedit', query: { cid: scope.row.cid } }">
            <el-button type="success">编辑</el-button>
          </router-link>
          <el-button
            type="danger"
            @click="handlerContractDeleteBtn(scope.row.cid)"
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
        title="合同删除"
        width="30%"
    >
        <span>您确定要删除么</span>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="editDeleteDialog = false">取消</el-button>
            <el-button type="warning" @click="handlerContractDeleteSubmit">确定</el-button>
        </span>
        </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { Paginate } from "../../type/base";
import {
  handlerContractTable,
  handlerContractDelete,
} from "../../http/contract";
import { SUCCESS } from "@/config";
import { ContractTable } from "../../type/contract";
import { ElMessage } from "element-plus";
import{StaffTable} from '../../type/staff'
import{handlerStaffList} from '../../http/staff'
export default defineComponent({
  setup() {
    // 搜索表单
    let searchForm = reactive({
      cid: "",
      cname: "",
    });
    // 表格
    let contractTable = ref<ContractTable>();
    // 乙方姓名
    let staffList=ref<StaffTable>()
    // 类型
    let typeObj = reactive({
      "1": "固定期限",
      "2": "非固定期限",
      "3": "以完成一定工作任务为限",
      "4": "外聘合同",
      "5": "劳务派遣合同",
    });
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
    let editDeleteDialog = ref<boolean>(false);
    let editDeleteIdx = ref<number>(0);
    let handlerContractDeleteBtn = (cid: number) => {
      editDeleteIdx.value = cid;
      editDeleteDialog.value = true;
    };
    let handlerContractDeleteSubmit = () => {
      handlerContractDelete(editDeleteIdx.value)
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
    // 初始化
    let initData = () => {
      let params = Object.assign({}, paginate, searchForm);
       handlerStaffList().then(res => {
               if(res.data.code === SUCCESS) {
                   staffList.value = res.data.data as StaffTable;        
               }else{
                   ElMessage.warning(res.data.msg);
               }
           }).catch(err => {
               console.log(err);
           })
      handlerContractTable(params)
        .then((res) => {
          if (res.data.code === SUCCESS) {
            contractTable.value = res.data.data as ContractTable;
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
      searchForm,
      contractTable,
      handleSizeChange,
      handleCurrentChange,
      handlerSearchSubmit,
      paginate,
      typeObj,
      editDeleteDialog,
      total,
      handlerContractDeleteBtn,
      handlerContractDeleteSubmit,
      handlerStaffList
    };
  },
});
</script>

<style scoped>
</style>