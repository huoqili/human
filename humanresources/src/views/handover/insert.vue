<template>
    <div>
        <el-form :model="handoverForm" label-width="120px">
            <el-form-item label="申请人部门">
              <el-select v-model="handoverForm.did"  placeholder="请选择职工部门" @change="departmentChange(handoverForm.did)" >
                <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.dname" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请人工位">
              <el-select v-model="handoverForm.pid"  placeholder="请选择职工职位" @change="positionChange(handoverForm.pid)" >
                <el-option v-for="item in positionList" :key="'position'+item.did" :label="item.pname" :value="item.pname" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请人">
              <el-select v-model="handoverForm.sname"  placeholder="请选择职工姓名"  >
                <el-option v-for="item in staffList" :key="'staff'+item.sid" :label="item.sname" :value="item.sname" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请人工号">
              <el-select v-model="handoverForm.snumber"  placeholder="请选择职工工号"  >
                <el-option v-for="item in staffList" :key="'staff'+item.did" :label="item.snumber" :value="item.snumber" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请人入职时间">
                <el-col :span="11">
                  <el-date-picker v-model="handoverForm.sinduction" type="date" placeholder="选择申请人入职日期"  style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="离职申请时间">
                <el-col :span="10">
                  <el-date-picker v-model="handoverForm.qapplication" type="date" placeholder="选择申请离职日期"  style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="实际离职时间">
                <el-col :span="9">
                  <el-date-picker v-model="handoverForm.hactual" type="date" placeholder="选择实际离职日期"  style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="工作交接状态" :inline="true">
                 <el-select    placeholder="请选择交接工作状态" v-model="handoverForm.hstate">
                   <el-option v-for="item in hstateList " :key="'hstate'+item.id" :label="item.value" :value="item.id"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="工作交接人">
                <el-input v-model="handoverForm.hperson" placeholder="请输入工作交接人"></el-input>
            </el-form-item>

            <el-form-item label="工作交接时间">
                <el-col :span="8">
                  <el-date-picker v-model="handoverForm.htime" type="date" placeholder="选择交接日期"  style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handlerSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import {defineComponent, reactive,ref,onMounted} from 'vue'
import { handlerDepartmentList } from '@/http/department';
import {HandOverForm,HandOverTable} from '@/type/handover'
import { PositionList } from '../../type/position'
import { DepartmentTable } from '../../type/department'
import {handlerHandoverInsert} from '@/http/handover';
import {handlerStaffList } from '@/http/staff'
import { DropDownMenuArr,anyObj } from '../../type/base';
import { StaffTable } from '@/type/staff';
import {handlerHworkQuery,handlerHstateQuery} from '../../http/normalInfo';
import { SUCCESS } from '@/config';
import { handlerGetPositionList } from '@/http/position';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        let handoverForm = reactive<HandOverForm>({
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
        })
        let router = useRouter();
        
        let departmentList = ref<DepartmentTable>();
        let positionList = ref<PositionList>();
        let staffList = ref<StaffTable>();
        let hworkList = ref<DropDownMenuArr>();
        let hstateList = ref<DropDownMenuArr>();
        let handlerSubmit = () => {
            let positionArr = positionList.value as any;
            let pid = '';
            for(let i = 0; i <positionArr.length;i++) {
              if(positionArr[i].pname === handoverForm.pid) {
                pid = positionArr[i].pid;
              }
            }
            handoverForm.pid = pid;

             let departmentArr = departmentList.value as any;
              let did = '';
            for(let i = 0; i <departmentArr.length;i++) {
              if(departmentArr[i].dname === handoverForm.did) {
                did = departmentArr[i].did;
              }
            }
            handoverForm.did = did;

          handlerHandoverInsert(handoverForm).then(res => {
            if(res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg);
              router.push({name: 'handoverindex'});
            }else{
              ElMessage.warning(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
        }
        let initData = ()=>{
          Promise.all([handlerDepartmentList(),handlerHworkQuery(),handlerHstateQuery()]).then(res=>{
            departmentList.value = res[0].data.data as DepartmentTable;
            hworkList.value = res[1].data.data as HandOverTable;
            hstateList.value = res[2].data.data as HandOverTable;
          }).catch(err=>{
            console.log(err);
          })
        }
        const departmentChange = (val:string) =>{
          let departmentArr = departmentList.value as any;
          let did = '';
            for(let i = 0; i <departmentArr.length;i++) {
              if(departmentArr.dname === val) {
                did = departmentArr.did;
              }
            }
            handoverForm.pid = '';
            handlerGetPositionList(did).then(res=>{
              let data = res.data.data as PositionList
                positionList.value = data;
            })
        }
        const positionChange = (val:string) =>{
            handoverForm.sname = '';
            handlerStaffList().then(res=>{
                staffList.value = res.data.data as StaffTable;  
            })

        }
        onMounted(() => {
            initData();
          })

        return{
           handoverForm,
           departmentList,
           positionList,
           hworkList,
           staffList,
           hstateList,
           handlerSubmit,
           departmentChange,
           positionChange,
        }
    }
}) 
    

</script>
<style scoped>

</style>