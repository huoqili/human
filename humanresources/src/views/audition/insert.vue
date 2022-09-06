<template>
  <div class="audition-insert">
      <el-form :model="auditionForm" label-position="top">
          <el-form-item label="日期时间">
              <el-date-picker type="date" style="width: 25%" v-model="auditionForm.times" placeholder="请选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="应聘者姓名">
            <el-input v-model="auditionForm.aname" style="width: 25%" placeholder="请输入应聘者姓名"></el-input>
          </el-form-item>
          <el-form-item label="应聘者手机号码">
            <el-input v-model="auditionForm.aphone" style="width: 25%" placeholder="请输入应聘者手机号"></el-input>
          </el-form-item>
        
          <el-form-item label="关联招聘需求">
              <el-button style="width: 25%;backgroundColor: #ccc;color: #fff" @click="handlerShowTableRidBtn" >关联招聘需求</el-button>
          </el-form-item>

          <v-model :model="recruitDutyForm" label-position="top">
            <el-form-item label="需求岗位">
                  <el-input v-model="recruitDutyForm.pname" disabled style="width: 25%" placeholder="请输入应聘者手机号"></el-input>
            </el-form-item>
            <el-form-item label="岗位职责">
                  <el-input v-model="recruitDutyForm.rduty" disabled style="width: 25%" placeholder="请输入应聘者手机号"></el-input>
            </el-form-item>
            <el-form-item label="任职条件">
                  <el-input v-model="recruitDutyForm.rcondition" disabled style="width: 25%" placeholder="请输入应聘者手机号"></el-input>
            </el-form-item>
          </v-model>

          <el-form-item label="简历上传">
             <el-upload
              class="upload-demo"
              :action="urlPath + '/admin/upload'"
              multiple
              :limit="1"
               :on-success="handerResumeUploadSuccess"
              
            >
              <el-button size="small" type="primary">请上传简历</el-button>
              <template #tip>
          
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button class="audition-insert-btn" @click="handlerAuditionInfoSubmit">提交</el-button>
          </el-form-item>
      </el-form>

      <el-dialog
        v-model="showTableRid"
        title="选择数据"
        width="60%"
      >
        <el-table  :data="recruitDutyTable" ref="mytable"  border>
          <el-table-column  label="岗位选择" width="80" align="center">
            <template #default="scope">
                <el-radio :label="scope.row" v-model="rid">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="需求岗位" prop="position.pname"></el-table-column>
          <el-table-column label="岗位职责" prop="rduty"></el-table-column>
          <el-table-column label="任职条件" prop="rcondition"></el-table-column>  
        </el-table>

        <el-pagination
            v-model:currentPage="paginate.page"
            :page-sizes="[6, 10, 15, 20]"
            :page-size="paginate.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            >
        </el-pagination>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showTableRid = false">取消</el-button>
            <el-button type="primary" @click="handlerRadioRidSubmit"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { AuditionForm,RecruitDutyForm,RecruitDutyTable } from '../../type/audition'
import { SUCCESS, URLPATH } from '../../config/index'
import { ElMessage } from 'element-plus';
import { handlerRutyList } from '../../http/recruit'
import { Paginate } from '../../type/base'
import { anyObj } from '../../type/base'
import { handlerAuditionInsert } from '../../http/condition'

export default defineComponent({
    setup() {
      let auditionForm = ref<AuditionForm>({
          times: '',
          aname: '',
          rid: '',
          aphone: '',
          resume: ''
      });

      let paginate = reactive<Paginate>({
            page: 1,
            limit: 6
        })
        let total = ref<number>();

      let rid = ref({});
      let recruitDutyForm = ref<RecruitDutyForm>({
          pname: '',
           rduty: '',
          rcondition: ''
      });
      let recruitDutyTable = ref<RecruitDutyTable>();   
      
      let handlerRadioRidSubmit = () => {
        let rids = rid.value as anyObj;
        if(rids.rid) {
          auditionForm.value.rid = rids.rid;
          recruitDutyForm.value.pname = rids['position.pname'];
          recruitDutyForm.value.rduty = rids.rduty;
          recruitDutyForm.value.rcondition = rids.rcondition;
        }
        showTableRid.value = false;
        console.log(recruitDutyForm.value);

      }

      let urlPath = ref(URLPATH);
      let showTableRid = ref<boolean>(false);

       let handleSizeChange = (value:number) => {
             paginate.limit = value;
             paginate.page = 1;
             initRutyTable();
        }

        let handleCurrentChange = (value:number) => {
                paginate.page = value;
                initRutyTable();
        }

      let handerResumeUploadSuccess = (res:any) =>{
          let { code,msg,url } = res;
          if(code === SUCCESS) {
            ElMessage.success(msg);
            auditionForm.value.resume = url;
          }else{
            ElMessage.warning(msg);
          }
      }

      let dutyForm = ref({
        pname: '',
        rduty: '',
        rcondition: ''
      })

      let mytable = ref();

     

      let handlerShowTableRidBtn = () => {
        showTableRid.value = true;
        initRutyTable();
      }

      let initRutyTable = () => {
          let params = Object.assign({},paginate);
          handlerRutyList(params).then(res => {
            recruitDutyTable.value = res.data.data as RecruitDutyTable;
            total.value = res.data.count;
          }).catch(err => {
            console.log(err);
          })
      }

      let handlerAuditionInfoSubmit = () => {
        handlerAuditionInsert(auditionForm.value).then(res => {
            if(res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg);
            }else{
              ElMessage.warning(res.data.msg);
            }
        }).catch(err => {
          console.log(err);
        })
      }

      return {
        auditionForm,
        urlPath,
        showTableRid,
        dutyForm,
        paginate,
        total,
        recruitDutyTable,
        mytable,
        rid,
        recruitDutyForm,
        handerResumeUploadSuccess,
        handlerAuditionInfoSubmit,
        handlerShowTableRidBtn,
        handleSizeChange,
        handleCurrentChange,
        handlerRadioRidSubmit
      } 
    }
})
</script>


<style scoped>
 .audition-insert-btn {
        width: 150px;
        background-color: #0db3a6;
        margin-top: 15px;
        color: #fff;
    }
   .el-table__header-warpper .el-checkbox{
      display: none;
    }
</style>