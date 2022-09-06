<template>
    <div>
        <el-form :inline="true" :model="searchFrom">
            <el-form-item label="离职申请人">
                 <el-input v-model="searchFrom.sname"></el-input>
            </el-form-item>
            <el-form-item label="工号">
                 <el-input v-model="searchFrom.snumber"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="handoverTable" border >
             <el-table-column label="申请人" prop="sname"></el-table-column>
             <el-table-column label="申请日期" prop="qapplication"></el-table-column>
             <el-table-column label="工号" prop="snumber"></el-table-column>
             <el-table-column label="所属部门" prop="department.dname"></el-table-column>
             <el-table-column label="所属职位" prop="position.pname"></el-table-column>
             <el-table-column label="入职时间" prop="sinduction"></el-table-column>
             <el-table-column label="最后离职日" prop="hactual"></el-table-column>
             <el-table-column label="工作交接状态">
                <template #default="scope">
                    <span>{{ hstateObj[scope.row.hstate] }}</span>
                </template>
             </el-table-column>
             <el-table-column label="交接人" prop="hperson"></el-table-column>
             <el-table-column label="交接日期" prop="htime"></el-table-column>
             <el-table-column label="操作" width="175">
                <template  #default="scope">
                    <router-link :to="{name:'handoveredit',query: {hid: scope.row.hid }}" >
                        <el-button type="success">编辑</el-button>
                    </router-link>
                    <el-button type="danger" @click="handlerHandoverDeleteBtn(scope.row.hid)">删除</el-button> 
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
        title="职工删除"
        width="30%"
    >
        <span>您确定要删除么</span>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="editDeleteDialog = false">取消</el-button>
            <el-button type="warning" @click="handlerHandoverDeleteSubmit">确定</el-button>
        </span>
        </template>
  </el-dialog>
</template>
<script lang="ts">
import {defineComponent,reactive,ref,onMounted} from 'vue'
import {HandOverTable} from '@/type/handover';
import {handlerHandoverDelete,handlerHandoverTable} from '@/http/handover'
import { Paginate } from '../../type/base';
import { ElMessage } from 'element-plus';
import { SUCCESS } from '@/config'
export default defineComponent({
    setup(){
        let searchFrom = reactive({
           snumber:'',
           sname: ''
       });
       let hstateObj = reactive({
          '1':'已交接',
          '2':'未交接'
       })
       let handoverTable = ref<HandOverTable>();
       let paginate = reactive<Paginate>({
           page: 1,
           limit: 5
       });
       let total = ref<number>();
       let editDeleteIdx = ref<number>(0);
       let editDeleteDialog = ref<boolean>(false);
       let handleSizeChange = (value:number) => {
                paginate.limit = value;
                paginate.page = 1;
                initData();
         }    
         let handleCurrentChange = (value:number) => {
           paginate.page = value;
           initData();
         }
        let handlerSearchSubmit = () => {
           paginate.page = 1;
           initData();
         }
         let handlerHandoverDeleteBtn = (qid: number) => {
          editDeleteIdx.value = qid;
          editDeleteDialog.value = true;
      }
      let handlerHandoverDeleteSubmit = () => {
            handlerHandoverDelete(editDeleteIdx.value).then(res => {
                if(res.data.code === SUCCESS) {
                    ElMessage.success(res.data.msg);
                    paginate.page = 1;
                    initData();
                    editDeleteDialog.value = false;
                }else{
                    ElMessage.warning(res.data.msg);
                }
            }).catch(error => {
                console.log(error);
            })
        }
        let initData = () => {
           let params = Object.assign({},paginate,searchFrom);
           handlerHandoverTable(params).then(res => {
               if(res.data.code === SUCCESS) {
                   handoverTable.value = res.data.data as HandOverTable;
                   total.value = res.data.count;
               }
           }).catch(error => {
               console.log(error);
           })
       }
       onMounted(() => {
           initData();
       })
        return{
           searchFrom,
           handoverTable,
           hstateObj,
           total,
           paginate,
           editDeleteDialog,
           handleSizeChange,
           handleCurrentChange,
           handlerSearchSubmit,
           handlerHandoverDeleteBtn,
           handlerHandoverDeleteSubmit
        }
    }
}) 
    

</script>
<style scoped>

</style>