<template>
    <div>
        <el-form :inline="true" :model="searchFrom">
            <el-form-item label="离职申请人">
                 <el-input v-model="searchFrom.qname"></el-input>
            </el-form-item>
            <el-form-item label="工号">
                 <el-input v-model="searchFrom.qnumber"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="quitTable" border >
             <el-table-column label="申请人" prop="qname"></el-table-column>
             <el-table-column label="申请日期" prop="qapplication"></el-table-column>
             <el-table-column label="工号" prop="qnumber"></el-table-column>
             <el-table-column label="所属部门" prop="department.dname"></el-table-column>
             <el-table-column label="入职时间" prop="qinduction"></el-table-column>
             <el-table-column label="最后工作日" prop="qlasttime"></el-table-column>
             <el-table-column label="离职原因">
                <template #default="scope">
                    <span>{{ reasonObj[scope.row.qreason] }}</span>
                </template>
             </el-table-column>
             <el-table-column label="离职原因备注" prop="qnote"></el-table-column>
             <el-table-column label="操作" width="175">
                <template  #default="scope">
                    <router-link :to="{name:'quitedit',query: {qid: scope.row.qid }}" >
                        <el-button type="success">编辑</el-button>
                    </router-link>
                    <el-button type="danger" @click="handlerStaffDeleteBtn(scope.row.qid)">删除</el-button> 
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
            <el-button type="warning" @click="handlerStaffDeleteSubmit">确定</el-button>
        </span>
        </template>
  </el-dialog>
</template>
<script lang="ts">
import {defineComponent,reactive,ref,onMounted} from 'vue'
import {QuitTable} from '../../type/quit'
import { Paginate } from '../../type/base';
import { ElMessage } from 'element-plus';
import {handlerQuitDelete,handlerQuitIndex} from '@/http/quit'
import { SUCCESS } from '@/config'
export default defineComponent({
    setup(){
        let searchFrom = reactive({
           qnumber:'',
           qname: ''
       });
       let reasonObj = reactive({
           '1':'个人原因',
           '2':'家庭原因',
           '3':'发展原因',
           '4':'薪资原因',
           '5':'工作压力',
           '6':'无晋升机会',
           '7':'合同到期不续签',
           '8':'协议解除',
           '9':'试用期内辞退',
           '10':'违反公司条例',
           '11':'组织调整/裁员',
           '12':'其他'
       })
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
       let quitTable = ref<QuitTable>();
      let handlerStaffDeleteBtn = (qid: number) => {
          editDeleteIdx.value = qid;
          editDeleteDialog.value = true;
      }
      let handlerStaffDeleteSubmit = () => {
            handlerQuitDelete(editDeleteIdx.value).then(res => {
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
           handlerQuitIndex(params).then(res => {
               if(res.data.code === SUCCESS) {
                   quitTable.value = res.data.data as QuitTable;
                   total.value = res.data.count;
               }
           }).catch(error => {
               console.log(error);
           })
       }
       onMounted(() => {
           initData();
       })
        return {
          searchFrom,
          reasonObj,
          quitTable,
          paginate,
          editDeleteDialog,
          total,
          handleSizeChange,
          handleCurrentChange,
          handlerSearchSubmit,
          handlerStaffDeleteBtn,
          handlerStaffDeleteSubmit
        }
    }
}) 
    

</script>
<style scoped>

</style>