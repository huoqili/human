<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6"><div class="box1">面试通过{{echartData.pass}}人</div></el-col>
      <el-col :span="6"><div class="box1">面试未通过{{echartData.nopass}}人</div></el-col>
       <el-col :span="6"><div class="box1">录取{{echartData.empass}}人</div></el-col>
      <el-col :span="6"><div class="box1">未录取{{echartData.emnopass}}人</div></el-col>
    </el-row>
    <p style="color: skyblue;margin: 15px 0;">面试记录</p>
    <el-table class="audition-query" @row-click="handlerTableRowClick" :header-cell-style="{background: '#000'}" :data="auditionTable" height="400" :row-class-name="tableRowClassName" border>
      <el-table-column label="日期时间" prop="recruit.rtimes" width="120"></el-table-column>
      <el-table-column label="负责招聘人员" prop="recruit.rname" width="120"></el-table-column>
      <el-table-column label="招聘部门" prop="recruit.department.dname" width="120"></el-table-column>
      <el-table-column label="关联招聘需求" prop="recruit.position.pname" width="180"></el-table-column>
      <el-table-column label="应聘者姓名" prop="aname" width="120"></el-table-column>
       <el-table-column label="应聘者手机号" prop="aphone" width="150"></el-table-column>
       <el-table-column label="简历" width="120">
          <template #default="scope">
            <a class="table-a" :href="urlPath+scope.row.resume" download="resume">简历</a>
          </template>
       </el-table-column>
       <el-table-column label="简历是否合格" width="120">
         <template #default="scope">
           <span>{{obj[scope.row.rqualified]}}</span>
         </template>
       </el-table-column>
       <el-table-column label="简历反馈" prop="rfeedback" width="300"></el-table-column>
       <el-table-column label="面试时间" prop="atimes" width="120"></el-table-column>
       <el-table-column label="面试结果" width="120">
          <template #default="scope">
           <span>{{obj[scope.row.aresult]}}</span>
         </template>
       </el-table-column>
       <el-table-column label="录用结果"  width="120">
          <template #default="scope">
           <span>{{obj[scope.row.emresult]}}</span>
         </template>
       </el-table-column>
       <el-table-column label="面试评价" prop="cevaluate" width="300"></el-table-column>
       <el-table-column label="录用情况反馈" prop="emfeedback" width="300"></el-table-column>
    </el-table>
    <el-pagination
            v-model:currentPage="paginate.page"
            :page-sizes="[8, 12, 15, 20]"
            :page-size="paginate.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            >
        </el-pagination>

        <el-dialog
          v-model="dialogVisible"
          title="面试结果编辑"
          width="55%"
        >
          <el-form :model="auditionEditForm" label-position="top">
            <el-form-item label="日期时间">
              <el-input disabled v-model="auditionEditForm.times"></el-input>
            </el-form-item>
            <el-form-item label="面试者姓名">
              <el-input disabled v-model="auditionEditForm.aname"></el-input>
            </el-form-item>
            <el-form-item label="面试者手机号码">
              <el-input disabled v-model="auditionEditForm.aphone"></el-input>
            </el-form-item>
            <el-form-item label="简历是否合格">
              <el-select v-model="auditionEditForm.rqualified" placeholder="请选择">
              <el-option
                v-for="(item,index) in rqualifiedObj"
                :key="'rqualified'+index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="简历反馈">
              <el-input type="textarea" v-model="auditionEditForm.rfeedback"></el-input>
            </el-form-item>
            <el-form-item label="面试时间">
              <el-date-picker v-model="auditionEditForm.atimes" type="date" placeholder="请选择面试时间">
             </el-date-picker>
            </el-form-item>
              <el-form-item label="面试结果">
              <el-select v-model="auditionEditForm.aresult" placeholder="请选择">
              <el-option
                v-for="(item,index) in rqualifiedObj"
                :key="'eresult'+index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            </el-form-item>
              <el-form-item label="录用结果">
              <el-select v-model="auditionEditForm.emresult" placeholder="请选择">
              <el-option
                v-for="(item,index) in rqualifiedObj"
                :key="'emresult'+index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="面试评价">
              <el-input type="textarea" v-model="auditionEditForm.cevaluate"></el-input>
            </el-form-item>
            <el-form-item label="录用情况反馈">
               <el-input type="textarea" v-model="auditionEditForm.emfeedback"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handlerAuditionEditSubmit"
                >提交</el-button
              >
            </span>
          </template>
        </el-dialog>
  </div>
</template>

<script lang="ts">
import { SUCCESS,URLPATH } from '@/config'
import { anyObj, Paginate } from '@/type/base'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive,ref,onMounted } from 'vue'
import { handlerAuditionIndex,handlerConditionShow,handlerAuditionUpdate,handlerAuditionNew } from '../../http/condition'
import { AuditionTable,AuditionForm } from '../../type/audition';


export default defineComponent({
    setup() {
        let seachForm = {

        }
        let rqualifiedObj = [
          {value: 0, label: '合格'},
          {value: 1, label: '不合格'}
        ]

        let echartData = ref<anyObj>({});
        let urlPath = URLPATH;
        let paginate = reactive<Paginate>({
          page: 1,
          limit: 8
        });
        let obj = {
          0: '合格',
          1: '不合格'
        }

        let dialogVisible = ref<boolean>(false);

        let auditionEditForm = ref<AuditionForm>();

        let auditionTable = ref<AuditionTable>();
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

        let tableRowClassName = ({row,rowIndex}:any) => {

          if(rowIndex % 2 == 0) {
            return 'even-row'
          }else if(rowIndex % 2 == 1){
            return 'odd-row'
          }else{
            return ''
          }
        }

        let initData = () => {
            let params = Object.assign({},paginate,seachForm);
            handlerAuditionIndex(params).then(res => {
              if(res.data.code === SUCCESS) {
                auditionTable.value = res.data.data as AuditionTable;
                total.value = res.data.count;
              }else{
                ElMessage.warning(res.data.msg);
              }
            }).catch(err => {
              console.log(err);
            });
            handlerAuditionNew().then(res => {
              if(res.data.code === SUCCESS) {
                echartData.value = res.data.data as any;
                console.log(echartData.value);
              }else{
                ElMessage(res.data.msg);
              }
            }).catch(err => {
              console.log(err);
            }) 
        }

        let handlerTableRowClick = (data:any) => {
          let aid = data.aid;
          handlerConditionShow(aid).then(res => {
            if(res.data.code === SUCCESS) {
              auditionEditForm.value = res.data.data as AuditionForm;
              dialogVisible.value = true;
            }else{
              ElMessage.warning(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
        }

        let handlerAuditionEditSubmit = () => {
            handlerAuditionUpdate(auditionEditForm.value).then(res => {
              if(res.data.code === SUCCESS) {
                ElMessage.success(res.data.msg);
                dialogVisible.value = false;
                initData();
              }else{
                ElMessage.warning(res.data.msg);
              }
            }).catch(err => {
              console.log(err);
            })
             
        }
        onMounted(() => {
          initData();
        });
        return {
          auditionTable,
          urlPath,
          paginate,
          total,
          dialogVisible,
          auditionEditForm,
          rqualifiedObj,
          obj,
          echartData,
          tableRowClassName,
          handleSizeChange,
          handleCurrentChange,
          handlerTableRowClick,
          handlerAuditionEditSubmit
        }
    }
})
</script>


<style >
 .el-table .even-row {
  --el-table-tr-background-color: #384C8E;
  color: #fff;
}
.el-table .odd-row {
  --el-table-tr-background-color: #1C223C;
  color: #fff;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #81accf !important;
}
a.table-a {
  color: skyblue;
}
.box1 {
  height: 200px;
  line-height: 200px;
  background-color: #1C223C;
  text-align: center;
  color: skyblue;
  font-size: 32px;
}



</style>