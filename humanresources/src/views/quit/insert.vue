<template>
    <div>
        <el-form :model="quitForm" label-width="120px">
            <el-form-item label="申请人">
                <el-input v-model="quitForm.qname"></el-input>
            </el-form-item>
            <el-form-item label="申请离职时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="quitForm.qapplication"  style="width: 100%;"></el-date-picker>
              </el-col>    
            </el-form-item>
            <el-form-item label="工号">
                <el-input v-model="quitForm.qnumber"></el-input>
            </el-form-item>
            <el-form-item label="职工部门">
              <el-select v-model="quitForm.did"  placeholder="请选择职工职位" >
                <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="quitForm.qinduction"  style="width: 100%;"></el-date-picker>
              </el-col>    
            </el-form-item>
            <el-form-item label="最后工作日">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期"  v-model="quitForm.qlasttime" style="width: 100%;"></el-date-picker>
              </el-col>    
            </el-form-item>
            <el-form-item label="离职原因">
              <el-select  placeholder="请选择离职原因" v-model="quitForm.qreason" >
                <el-option v-for="item in quitseasonList " :key="'qreason'+item.id" :label="item.value" :value="item.id" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="离职原因备注">
                <el-input v-model="quitForm.qnote"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handlerSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import {defineComponent,onMounted,reactive,ref} from 'vue'
import {QuitForm,QuitTable} from '../../type/quit';
import { DepartmentTable } from '../../type/department';
import { DropDownMenuArr } from '../../type/base';
import {handlerQuitInsert} from '@/http/quit';
import { handlerDepartmentList } from '../../http/department';
import {handlerQuitReasonQuery} from '../../http/normalInfo';
import { SUCCESS } from '@/config'
import { ElMessage } from 'element-plus'
export default defineComponent({
   setup() {
       let quitForm = reactive<QuitForm> ({
           qname:'',
           qapplication:'',
           qnumber:'',
           did:'',
           qinduction:'',
           qlasttime:'',
           qreason:1,
           qnote:''
       })
       
       let departmentList = ref<DepartmentTable>();
       let quitseasonList = ref<DropDownMenuArr>();
       let handlerSubmit = () => {
          handlerQuitInsert(quitForm).then(res => {
            if(res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg);
            }else{
              ElMessage.warning(res.data.msg);
            }
            
          }).catch(err => {
            console.log(err);
          })
          
      }
      let initQuitDate = () =>{
          Promise.all([handlerDepartmentList(),handlerQuitReasonQuery()]).then(res => {
              departmentList.value = res[0].data.data as DepartmentTable;
              quitseasonList.value = res[1].data.data as QuitTable;
          }).catch(err => {
              console.log(err);
          })
      }
       onMounted(() => {
           initQuitDate();
       })
       return {
           quitForm,
           departmentList,
           quitseasonList,
           handlerSubmit
       }
   }
}) 
    

</script>
<style scoped>

</style>
