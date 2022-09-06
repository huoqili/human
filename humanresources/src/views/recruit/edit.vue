<template>
  <div class="recruit-edit">
            <el-form :model="recruitForm" label-position="top">
          <el-form-item label="日期时间">
              <el-date-picker type="date" style="width: 25%" v-model="recruitForm.rtimes" placeholder="请选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="申请人">
              <el-input style="width: 25%" v-model="recruitForm.rname" placeholder="请输入申请人姓名"></el-input>
          </el-form-item>
        
          <el-form-item label="需求部门">
              <el-select style="width: 25%" v-model="recruitForm.did" placeholder="请选择职工职位" @change="handlerPositionList">
                  <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="需求职位">
              <el-select style="width: 25%" v-model="recruitForm.pid" placeholder="请选择职工职位">
                  <el-option v-for="item in positionList" :key="'position'+item.pid" :label="item.pname" :value="item.pid"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="招聘人数">
              <el-input style="width: 25%" type="number" v-model="recruitForm.rnum" placeholder="请输入招聘人数"></el-input>
          </el-form-item>

            <el-form-item label="薪酬建议">
              <el-input style="width: 25%" v-model="recruitForm.rsalayarea" placeholder="请输入薪酬建议"></el-input>
          </el-form-item>

            <el-form-item label="招聘原因" class="form-item-half">
                <el-input type="textarea" maxlength="250"  show-word-limit :autosize="{ minRows: 8, maxRows: 8 }" v-model="recruitForm.rreason"></el-input>
            </el-form-item>
         
            <el-form-item label="岗位职责" class="form-item-half">
                <el-input type="textarea" maxlength="250"  show-word-limit :autosize="{ minRows: 8, maxRows: 8 }" v-model="recruitForm.rduty"></el-input>
            </el-form-item>
         
            <el-form-item label="任职条件" class="form-item-half">
                <el-input type="textarea" maxlength="250"  show-word-limit :autosize="{ minRows: 8, maxRows: 8 }" v-model="recruitForm.rcondition"></el-input>
            </el-form-item>
          

          <el-form-item label="期望到岗时间">
              <el-date-picker style="width: 25%"  type="date" v-model="recruitForm.arrive" placeholder="请选择到岗时间"></el-date-picker>
          </el-form-item>

          <el-form-item label="紧急程度">
              <el-select style="width: 25%"  v-model="recruitForm.urgent" placeholder="请选择紧急程度">
                  <el-option v-for="(item,index) in urgentArr" :key="'urgent'+index" :label="item.label" :value="item.value"></el-option>
              </el-select>
          </el-form-item>

          <el-form-item style="margin-top:30px">
              <el-button type="primary" @click="handlerRecruitUpdateSubmit">提交编辑</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script lang="ts">
import { SUCCESS } from '@/config';
import { ElMessage } from 'element-plus';
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { handlerRecruitShow } from '../../http/recruit'
import { RecruitForm } from '../../type/recruit'
import { DepartmentTable } from '../../type/department'
import { handlerDepartmentList } from '../../http/department'
import { handlerGetPositionList } from '../../http/position'
import { PositionList } from '../../type/position'
import { handlerRecruitUpdate } from '../../http/recruit'
  
export default defineComponent({
    setup() {
        let route = useRoute();

        let positionList = ref<PositionList>();

         let recruitForm = ref<RecruitForm>({
            rtimes: '',
            did: '',
            pid: '',
            rname: '',
            rnum: '',
            rsalayarea: '',
            rreason: '',
            rduty: '',
            rcondition: '',
            urgent: '',
            arrive: ''
        })

        let urgentArr = [
            {label: '一般',value: 0},
            {label: '紧急',value: 1}
        ]

         let departmentList = ref<DepartmentTable>();

        let handlerPositionList = () => {
          handlerGetPositionList(recruitForm.value.did).then(res => {
            if(res.data.code === SUCCESS) {
              recruitForm.value.pid = '';
              positionList.value = res.data.data as PositionList;
            }else{
              ElMessage.warning(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
        }

        let initData = () => {
            let rid = route.query.rid;
            handlerRecruitShow(rid as string).then(res => {
                if(res.data.code === SUCCESS) {
                    recruitForm.value = res.data.data as RecruitForm;
                     let pid = recruitForm.value.pid;
                    handlerPositionList();
                    setTimeout(() => {
                    recruitForm.value.pid = pid;
                    },80)
                }else{
                    ElMessage.warning(res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            })
            handlerDepartmentList().then(res => {
                if(res.data.code === SUCCESS) {
                    departmentList.value = res.data.data as DepartmentTable;
                }else{
                    ElMessage.warning(res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            })

        }

        let handlerRecruitUpdateSubmit = () => {
            handlerRecruitUpdate(recruitForm.value).then(res=> {
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
            recruitForm,
            urgentArr,
            departmentList,
            positionList,
            handlerRecruitUpdateSubmit
        }
    }
})
</script>


<style scoped>
   
</style>