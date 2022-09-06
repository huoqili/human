<template>
    <div class="staff-query">
        <el-form :inline="true" :model="searchFrom">
           <el-form-item label="原部门">
              <el-select v-model="searchFrom.did"  clearable placeholder="请选择职工职位" @change="handlerPositionList">
                <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
              </el-select>
            </el-form-item>
           <el-form-item label="原职位">
              <el-select v-model="searchFrom.pid"  clearable placeholder="请选择职工职位">
                <el-option v-for="item in positionList" :key="'position'+item.pid" :label="item.pname" :value="item.pid"></el-option>
              </el-select>
            </el-form-item>
            
             <el-form-item label="职工姓名">
                <el-input  v-model="searchFrom.sname"></el-input>
            </el-form-item>
             <el-form-item label="职工编号">
                <el-input  v-model="searchFrom.snumber"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
             </el-form-item>
        </el-form>
        <el-table :data="posttransferTable" border>
            <el-table-column label="调岗日期" prop="filingdate"></el-table-column>
            <el-table-column label="员工姓名" prop="sname"></el-table-column>
            <el-table-column label="员工编号" prop="snumber"></el-table-column>
            <el-table-column label="入职时间" prop="sinduction"></el-table-column>
            <el-table-column label="原部门" prop="department.dname"></el-table-column>
            <el-table-column label="原职位" prop="position.pname"></el-table-column>
            <el-table-column label="转入部门" prop="newdepartment.dname"></el-table-column>
             <el-table-column label="转入职位" prop="newposition.pname"></el-table-column>
        
           
            <el-table-column label="调岗原因" prop="ptreason"></el-table-column>
            <el-table-column label="操作" width="210" fixed="right" >
                <template  #default="scope">
                    <router-link :to="{name: 'posttransferedit',query: {ptid: scope.row.ptid }}" >
                        <el-button size="mini" type="success">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="handlerPositionDeleteBtn(scope.row.ptid)">删除</el-button> 
                     <el-button size="mini"  type="warning" @click="handlerStaffUpdataBtn(scope.row.ptid)">同意</el-button>  
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
            <el-button type="warning" @click="handlerPositionfDeleteSubmit">确定</el-button>
        </span>
        </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { Paginate } from '../../type/base'
import {PosttransferTable} from '../../type/posttransfer'
import {handlerPosttransferTable,handlerPosttransferDelete,handlerPtstateUpdate} from '../../http/posttransfer'
import { SUCCESS } from '@/config'
import { handlerDepartmentList } from '../../http/department'
import { handlerGetPositionList } from '../../http/position'
import { DepartmentTable } from '../../type/department'
import { PositionList } from '../../type/position'
import { ElMessage } from 'element-plus'


export default defineComponent({
   setup() {

       let posttransferTable = ref<PosttransferTable>();

        let departmentList = ref<DepartmentTable>();

        let positionList = ref<PositionList>();

        let editDeleteDialog = ref<boolean>(false);
        let editDeleteIdx = ref<number>(0);

       let paginate = reactive<Paginate>({
           page: 1,
           limit: 5
       });

       let searchFrom = reactive({
           did: '',
           pid: '',
           snumber:'',
           sname: ''
       });
       
       let total = ref<number>();

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
      let handlerPositionList = () => {
          handlerGetPositionList(searchFrom.did).then(res => {
            if(res.data.code === SUCCESS) {
              searchFrom.pid = '';
              positionList.value = res.data.data as PositionList;
            }else{
              ElMessage.warning(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
      }
// 点击删除按钮

      let handlerPositionDeleteBtn = (ptid: number) => {
          editDeleteIdx.value = ptid;
          editDeleteDialog.value = true;
      }
// 删除确定
        let handlerPositionfDeleteSubmit = () => {
            handlerPosttransferDelete(editDeleteIdx.value).then(res => {
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
    //   审核同意
      let handlerStaffUpdataBtn=(ptid: number)=>{
          
            handlerPtstateUpdate(ptid).then(res => {
                if(res.data.code === SUCCESS) {
                    ElMessage.success(res.data.msg);
                    paginate.page = 1;
                    initData();
                }else{
                    ElMessage.warning(res.data.msg);
                }
            }).catch(error => {
                console.log(error);
            })
      }
       let initData = () => {
           let params = Object.assign({},paginate,searchFrom);
           handlerDepartmentList().then(res => {
               if(res.data.code === SUCCESS) {
                   departmentList.value = res.data.data as DepartmentTable;        
               }else{
                   ElMessage.warning(res.data.msg);
               }
           }).catch(err => {
               console.log(err);
           })

           handlerPosttransferTable(params).then(res => {
               if(res.data.code === SUCCESS) {
                   posttransferTable.value = res.data.data as PosttransferTable;
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
           paginate,
           posttransferTable,
           searchFrom,
           total,
           departmentList,
           positionList,
           editDeleteDialog,
           handleSizeChange,
           handleCurrentChange,
           handlerPositionList,
           handlerSearchSubmit,
           handlerPositionDeleteBtn,
           handlerPositionfDeleteSubmit,
           handlerStaffUpdataBtn
       }
   }
})
</script>


<style>
.el-button+.el-button {
    margin-left: 0px;
}
</style>