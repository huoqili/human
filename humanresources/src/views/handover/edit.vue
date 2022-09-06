<template>
    <div>
        <el-form :model="handoverForm"  >
            <el-form-item label="申请人部门">
              <el-select v-model="handoverForm.did"  placeholder="请选择职工部门" @change="departmentChange(handoverForm.did)" >
                <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请人工位">
              <el-select v-model="handoverForm.pid"  placeholder="请选择职工职位"  >
                <el-option v-for="item in positionList" :key="'position'+item.did" :label="item.pname" :value="item.pid" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请人">
              <el-input v-model="handoverForm.sname"></el-input>
            </el-form-item>
            <el-form-item label="申请人工号">
              <el-input v-model="handoverForm.snumber"></el-input>
            </el-form-item>
            <el-form-item label="入职时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="handoverForm.sinduction"  style="width: 100%;"></el-date-picker>
              </el-col>    
            </el-form-item>
            <el-form-item label="申请离职时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="handoverForm.qapplication"  style="width: 100%;"></el-date-picker>
              </el-col>    
            </el-form-item>
            <el-form-item label="实际离职时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期"  v-model="handoverForm.hactual" style="width: 100%;"></el-date-picker>
              </el-col>    
            </el-form-item>
            <el-form-item label="工作交接状态" :inline="true">
                 <el-select    placeholder="请选择交接工作状态" v-model="handoverForm.hstate">
                   <el-option v-for="item in hstateList " :key="'hstate'+item.id" :label="item.value" :value="item.id"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="交接人">
                <el-input v-model="handoverForm.hperson"></el-input>
            </el-form-item>
            <el-form-item label="工作交接时间">
                <el-col :span="8">
                  <el-date-picker v-model="handoverForm.htime" type="date" placeholder="选择交接日期"  style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handlerUpdateSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import {defineComponent,ref,onMounted} from 'vue'
import {HandOverForm,HandOverTable} from '@/type/handover';
import { handlerGetPositionList } from '@/http/position';
import { DepartmentTable } from '../../type/department';
import { PositionList } from '../../type/position';
import {handlerHandoverUpdate ,handlerHandoverShow} from '@/http/handover'
import { useRoute } from 'vue-router'
import { SUCCESS } from '@/config';
import {handlerPoaitionList} from '@/http/position'
import { handlerDepartmentList } from '@/http/department';
import {handlerHworkQuery,handlerHstateQuery} from '../../http/normalInfo';
import { DropDownMenuArr } from '../../type/base';
import { ElMessage } from 'element-plus'
export default defineComponent({
   setup(){
       let handoverForm = ref<HandOverForm>({
               hid:'',
               sname:'',
               qapplication:'',
               snumber:'',
               pid:'',
               did:'',
               sinduction:'',
               hactual:'',
               hwork:1,
               hstate:1,
               hperson:'',
               htime:'' 
       });
        let departmentList = ref<DepartmentTable>();
        let positionList = ref<PositionList>();
        let hworkList = ref<DropDownMenuArr>();
        let hstateList = ref<DropDownMenuArr>();
        let route = useRoute();

        let initHandoverDate = () =>{
          let hid = route.query.hid as string;
          handlerHandoverShow(hid).then(res=>{
              if(res.data.code === SUCCESS) {
                handoverForm.value = res.data.data as HandOverForm;
                ElMessage.success(res.data.msg);
              }else{
                ElMessage.warning(res.data.msg);
              }
          }).catch(err=>{
              console.log(err);
              
          })
          Promise.all([handlerDepartmentList(),handlerPoaitionList(),handlerHworkQuery(),handlerHstateQuery()]).then(res=>{
            departmentList.value = res[0].data.data as DepartmentTable;
            positionList.value = res[1].data.data as PositionList;
            hworkList.value = res[2].data.data as HandOverTable;
            hstateList.value = res[3].data.data as HandOverTable;
          }).catch(err=>{
            console.log(err);
          })
        }
        let handlerUpdateSubmit = () => {
        handlerHandoverUpdate(handoverForm.value.hid as string, handoverForm).then(res=>{
            if(res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg);
            }else{
              ElMessage.warning(res.data.msg);
            }
        }).catch(err=>{
            console.log(err);
            
        })
    }
        const departmentChange = (val:string) =>{
            handoverForm.value.pid = '';
            handlerGetPositionList(val).then(res=>{
              let data = res.data.data as PositionList
                positionList.value = data;  
            })
        }

        onMounted(() => {
               initHandoverDate();
        })
       return{
           handoverForm,
           departmentList,
           positionList,
           hworkList,
           hstateList,
           departmentChange,
        
           handlerUpdateSubmit,
       }
      
    
   }
})
    

</script>
<style scoped>

</style>