<template>
  <div class="salay-feedback">
      <el-form :model="feedbackForm">
          <el-form-item label="职工编号" style="width: 300px">
              <el-input v-model="feedbackForm.snumber" placeholder="请输入反馈者编号" @change="handlerGetInfoBySnumber"></el-input>
          </el-form-item>
          <el-form :inline="true">
            <el-form-item label="职工姓名" style="margin-right: 30px">
                <el-input v-model="feedbackForm.sname" placeholder="请输入反馈者编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="职工部门" label-width="80px"  style="margin-right: 30px">
                <el-input v-model="feedbackForm.dname" placeholder="请输入反馈者编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="职工职位" label-width="80px"  style="margin-right: 30px">
                <el-input v-model="feedbackForm.pname" placeholder="请输入反馈者编号" disabled></el-input>
            </el-form-item>
          </el-form>
         
         <el-form-item label="反馈时间">
              <el-date-picker
                v-model="feedbackForm.ftimes"
                type="date"
                placeholder="请选择反馈时间"
            >
      </el-date-picker>
         </el-form-item>
         
          <el-form-item label="工资反馈原因" class="form-item-half">
              <el-input type="textarea" maxlength="250"  show-word-limit :autosize="{ minRows: 8, maxRows: 8 }" v-model="feedbackForm.freason"></el-input>
          </el-form-item>

          <el-form-item>
              <el-button type="primary" @click="handerFeekBackSubmit">反馈提交</el-button>
          </el-form-item>

      </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FeedBackForm } from '../../type/salay'
import { handlerSalayFeedBackInsert,handlerStaffInfoBySnumber } from '../../http/salayfeed'
import { SUCCESS } from '@/config';
import { ElMessage } from 'element-plus';
import { anyObj } from '../../type/base';
export default defineComponent({
   setup() {
       let feedbackForm = ref<FeedBackForm>({
           sname :'',
           snumber : '', 
           ftimes: '',
           pname: '',
           dname: '',
           freason: ''
       });

        let handlerGetInfoBySnumber = () => {
            handlerStaffInfoBySnumber({snumber: feedbackForm.value.snumber}).then(res => {
                if(res.data.code === SUCCESS) {
                    let data = res.data.data as anyObj;
                    feedbackForm.value.pname = data.position.pname;
                    feedbackForm.value.dname = data.department.dname;
                    feedbackForm.value.sname = data.sname;
                    
                }else {
                    ElMessage.warning(res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        }

       let handerFeekBackSubmit = () => {
           handlerSalayFeedBackInsert(feedbackForm.value).then(res => {
               if(res.data.code === SUCCESS) {
                   ElMessage.success(res.data.msg);
               }else {
                   ElMessage.warning(res.data.msg);
               }
           }).catch(err => {
               console.log(err);
           })
       }

       return {
           feedbackForm,
           handerFeekBackSubmit,
           handlerGetInfoBySnumber
       }
   }
})
</script>


<style scoped>
    .form-item-half {
        width: 50%;
    }
</style>