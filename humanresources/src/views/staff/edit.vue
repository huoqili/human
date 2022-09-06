<template>
  <div>
     <el-form :model="staffForm">
        <el-form-item label="职工姓名">
            <el-input  v-model="staffForm.sname"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="staffForm.sinduction" style="width: 100%;"></el-date-picker>
          </el-col>    
        </el-form-item>
        <el-form :inline="true">
            <el-form-item label="职工部门">
              <el-select v-model="staffForm.did" placeholder="请选择职工职位" @change="handlerPositionList">
                <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
              </el-select>
            </el-form-item>
           <el-form-item label="职工职位">
              <el-select v-model="staffForm.pid" placeholder="请选择职工职位">
                <el-option v-for="item in positionList" :key="'position'+item.pid" :label="item.pname" :value="item.pid"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <el-form :inline="true">
            <el-form-item label="职工性别">
              <el-select v-model="staffForm.ssex" placeholder="请选择职工性别">
                <el-option v-for="item in sexList" :key="'ssex'+item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职工学历">
              <el-select v-model="staffForm.seducation" placeholder="请选择职工学历">
                <el-option v-for="item in educationList" :key="'seducation'+item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职工政治面貌">
              <el-select v-model="staffForm.spolitical" placeholder="请选择职工政治面貌">
                <el-option v-for="item in politicalList" :key="'spolitical'+item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <el-form-item label="职工电话">
            <el-input  v-model="staffForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="职工邮箱">
            <el-input  v-model="staffForm.email"></el-input>
        </el-form-item>
        <el-form-item label="职工编号">
            <el-input  v-model="staffForm.snumber"></el-input>
        </el-form-item>
        <el-form :inline="true">
          <el-form-item label="毕业院校">
            <el-input  v-model="staffForm.school"></el-input>
          </el-form-item>
          <el-form-item label="职工专业">
            <el-input  v-model="staffForm.smajor"></el-input>
          </el-form-item>

          <el-form-item label="毕业时间">
           <el-col :span="11">
             <el-date-picker type="month" placeholder="选择日期" v-model="staffForm.sgraduation"></el-date-picker>
           </el-col>    
          </el-form-item>

        </el-form>
        <el-form-item>
          <el-button type="primary" @click="handlerUpdateSubmit">提交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { SUCCESS } from '@/config';
import { ElMessage } from 'element-plus';
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { handlerStaffShow,handlerStaffUpdate } from '../../http/staff'
import { StaffForm } from '../../type/staff'
import { DepartmentTable } from '../../type/department'
import { DropDownMenuArr } from '../../type/base';
import { PositionList } from '../../type/position'
import { handlerGetPositionList } from '../../http/position'
import { handlerDepartmentList } from '../../http/department'
import { handlerSexQuery,handlerPoliticalQuery,handlerEducationQuery } from '../../http/normalInfo'
export default defineComponent({
    setup() {
        let route = useRoute();
        let staffForm = ref<StaffForm>({
           sname: '',
           did: '',
           pid: '',
           phone: '',
           email: '',
           snumber : '',
           sinduction:'',
           ssex: 1,
           spolitical: 1,
           seducation: 1,
           school: '',
           smajor: '',
           sgraduation: ''  
       })
         let departmentList = ref<DepartmentTable>();
        let politicalList = ref<DropDownMenuArr>();
        let sexList = ref<DropDownMenuArr>();
        let educationList = ref<DropDownMenuArr>();
        let positionList = ref<PositionList>();

        let handlerPositionList = () => {
          handlerGetPositionList(staffForm.value.did).then(res => {
            if(res.data.code === SUCCESS) {
              staffForm.value.pid = '';
              positionList.value = res.data.data as PositionList;
            }else{
              ElMessage.warning(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
      }

        let initData = () => {
            let sid = route.query.sid as string;
            handlerStaffShow(sid).then(res => {
              if(res.data.code === SUCCESS) {
                staffForm.value = res.data.data as StaffForm;
                let pid = staffForm.value.pid;
                handlerPositionList();
                setTimeout(() => {
                   staffForm.value.pid = pid;
                },80)
              }else{
                ElMessage.warning(res.data.msg);
              }
            }).catch(err => {
              console.log(err);
            })
            Promise.all([handlerDepartmentList(),handlerPoliticalQuery(), handlerSexQuery(),handlerEducationQuery()]).then(res => {
              departmentList.value = res[0].data.data as DepartmentTable;
              politicalList.value = res[1].data.data as DropDownMenuArr ;
              sexList.value = res[2].data.data as DropDownMenuArr;
              educationList.value = res[3].data.data  as DropDownMenuArr;
            }).catch(err => {
              console.log(err);
            })     
        }

        let handlerUpdateSubmit = () => {
          handlerStaffUpdate(staffForm.value.sid as string, staffForm.value).then(res => {
            if(res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg);
            }else{
              ElMessage.warning(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
      }

        onMounted(() => {
            initData();
        })

        return {
          staffForm,
          departmentList,
          politicalList,
          sexList,
          educationList,
          positionList,
          handlerPositionList,
          handlerUpdateSubmit
        }
    } 
})
</script>


<style>

</style>