<template>
  <div>
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="部门编号">
          <el-input v-model="searchForm.dnum"></el-input>
        </el-form-item>
         <el-form-item label="部门名称">
          <el-input v-model="searchForm.dname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="departmentTable" border>
        <el-table-column label="部门编号" prop="dnum"></el-table-column>
        <el-table-column label="部门名称" prop="dname"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
              <router-link :to="{name: 'departmentedit',query: {did: scope.row.did }}" >
                <el-button type="success" @click="handlerDepartmentEdit(scope.row.did)">编辑</el-button>
              </router-link>
              <el-button type="danger" @click="handlerDepartmentDeleteBtn(scope.row.did)">删除</el-button> 
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
      v-model:currentPage="paginate.page"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="paginate.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

     <el-dialog
      v-model.sync="dialogDelete"
      title="部门删除"
      width="30%"
     >
      <span>您确定要删除么</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDelete = false">取消</el-button>
          <el-button type="primary" @click="handlerDepartmentDeleteSubmit"
            >删除</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from 'vue'
import { SearchForm,Paginate,DepartmentTable } from '../../type/department'
import { handlerDepartmentTable } from '../../http/department'
import { SUCCESS } from '@/config';
import { handlerDepartmentDelete } from '../../http/department' 
import { ElMessage } from 'element-plus';
export default defineComponent({
    setup() {
      let searchForm = reactive<SearchForm>({
        dname: '',
        dnum: ''
      });
      let paginate = reactive<Paginate>({
        page:1,
        limit: 2
      });

      let dialogDelete = ref<boolean>(false);

      let deleteIdx = ref<string>('');
      let count:Ref<number> = ref(0);
      let departmentTable = ref<DepartmentTable>(); 

      let handleSizeChange = (value:number) => {
        paginate.limit = value;
        paginate.page = 1;
        initDepartmentTable();
      }

      let handleCurrentChange = (value:number) => {
        paginate.page = value;
        initDepartmentTable();
      }

      let handlerDepartmentDeleteBtn = (idx:string) => {
          deleteIdx.value = idx;
          dialogDelete.value = true;
      }

      let handlerDepartmentDeleteSubmit = () => {
        handlerDepartmentDelete(deleteIdx.value).then(res => {
            if(res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg);
              dialogDelete.value = false;
              paginate.page = 1;
              initDepartmentTable();
              
            }else{
              ElMessage.warning(res.data.msg);
            }
        }).catch(err => {
          console.log(err);
        })
      }

      let handlerSearchSubmit = () => {
        paginate.page = 1;
        initDepartmentTable();
      }


      let initDepartmentTable = () => {
          const dataObj = Object.assign({},paginate,searchForm);
          handlerDepartmentTable(dataObj).then(res => {
            if(res.data.code === SUCCESS) {
              departmentTable.value = res.data.data as any;
              count.value = res.data.count as number;
            }
          }).catch(error => {
            console.log(error);
          })
      }

      onMounted(() => {
        initDepartmentTable();
      })
      
      return {
        searchForm,
        paginate,
        departmentTable,
        count,
        dialogDelete,
        handleSizeChange,
        handleCurrentChange,
        handlerSearchSubmit,
        handlerDepartmentDeleteBtn,
        handlerDepartmentDeleteSubmit
      }
    }
})
</script>

<style scoped>

</style>