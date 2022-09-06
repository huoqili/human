<template>
    <div class="salay-insert">
        <el-form :model="salayForm">
            <el-form-item label="工资发放时间" >
                <el-date-picker
                    v-model="salayForm.stime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <h3>#基本信息#</h3>
            </el-form-item>
            <el-form :inline="true">
                <el-form-item label="职工部门"  style="margin-right: 100px">
                    <el-select v-model="salayForm.did"  clearable placeholder="请选择职工职位" @change="handlerPositionList">
                        <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="职工职位"  style="margin-right: 100px">
                    <el-select v-model="salayForm.pid"  clearable placeholder="请选择职工职位" @change="handlerStaffNamesList">
                        <el-option v-for="item in positionList" :key="'position'+item.pid" :label="item.pname" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="职工姓名">
                    <el-select v-model="salayForm.sname"  clearable placeholder="请选择职工职位">
                        <el-option v-for="(item,index) in namesList" :key="'sname'+index" :label="item.sname" :value="item.sname"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-form :inline="true">
                  <el-form-item label="手机号码"  style="margin-top: 15px">
                    <el-input v-model="salayForm.sphone"></el-input>
                 </el-form-item>
            </el-form>

            <el-form-item>
                <h3>#工资明细#</h3>
            </el-form-item>
       
            <el-form :inline="true" label-position="top">
                <el-form-item label="基本工资" class="half-width">
                    <el-input v-model="salayForm.sbasicsalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
                <el-form-item label="加班薪资" class="half-width">
                    <el-input v-model="salayForm.sovertimesalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
            </el-form>

            <el-form-item>
                <h3>#奖金补贴#</h3>
            </el-form-item>

            <el-form :inline="true" label-position="top">
                <el-form-item label="奖金" class="half-width">
                    <el-input v-model="salayForm.sprizesalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
                <el-form-item label="补贴" class="half-width">
                    <el-input v-model="salayForm.ssubsidysalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
            </el-form>

            <el-form-item>
                <h3>#扣款项#</h3>
            </el-form-item>

            <el-form :inline="true" label-position="top">
                <el-form-item label="考勤扣款" class="half-width">
                    <el-input v-model="salayForm.attendancesalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
                <el-form-item label="五险一金代扣" class="half-width">
                    <el-input v-model="salayForm.fivesalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
                 <el-form-item label="个税代扣" class="half-width">
                    <el-input class="half-width" type="number" v-model="salayForm.taxsalay" @change="salayNum"></el-input>
                </el-form-item>
            </el-form>
           

            <el-form-item >
                <h3>#工资合计#</h3>
            </el-form-item>

            <el-form label-position="top">
                 <el-form-item label="实发工资" class="half-width" >
                    <el-input type="number" readonly v-model="salayForm.factsalay" class="half-width"></el-input>
                </el-form-item>
            </el-form>
           
            <el-form-item>
                <el-button class="salay-insert-btn" type="primary" @click="handlerSalayInsertSubmit">提交</el-button>
            </el-form-item>
         </el-form>

    </div>
</template>

<script lang="ts">
import { SalayForm } from '../../type/salay'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { handlerGetPositionList,handlerOneGetAllNames } from '../../http/position'
import { ElMessage } from 'element-plus';
import { SUCCESS } from '@/config';
import { PositionList } from '../../type/position'
import { DepartmentTable } from '../../type/department'
import { handlerDepartmentList } from '../../http/department'
import { anyObj } from '../../type/base'
import { handlerSalayInsert } from '../../http/salay'


export default defineComponent({
    setup() {
        let salayForm = reactive<SalayForm>({
            sname: '',
            sphone: '',
            sbasicsalay: '',
            sovertimesalay: '',
            sprizesalay: '',
            ssubsidysalay: '',
            attendancesalay: '',
            fivesalay: '',
            taxsalay: '',
            factsalay: 0,
            stime: '',
            did: '',
            pid: ''

        });

        let departmentList = ref<DepartmentTable>();
        let positionList = ref<PositionList>();
        let namesList = ref();
         let handlerPositionList = () => {
          handlerGetPositionList(salayForm.did as string).then(res => {
            if(res.data.code === SUCCESS) {
              salayForm.pid = '';
              positionList.value = res.data.data as PositionList;
            }else{
              ElMessage.warning(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
        }

        let handlerStaffNamesList = () => {
            handlerOneGetAllNames(salayForm.pid as string).then(res => {
                console.log(res);
                if(res.data.code === SUCCESS) {
                    let data = res.data.data as anyObj;
                    namesList.value = data.staff;

                }else{
                    ElMessage.warning(res.data.msg);
                }
            }).then(err => {
                console.log(err);
            })
        }

        let handlerSalayInsertSubmit = () => {
            salayNum();
           handlerSalayInsert(salayForm).then(res => {
               if(res.data.code === SUCCESS) {
                   ElMessage.success(res.data.msg);
               }else{
                   ElMessage.warning(res.data.msg);
               }
           }).catch(err => {
               console.log(err);
           }) 
        }
       
        let initData = () => {
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

        onMounted(() => {
            initData();
        })

        let formatSalay = (salay:string) => {
            return salay ? Number.parseInt(salay) : 0;
        }

        let salayNum = () => {
            salayForm.factsalay = formatSalay(salayForm.sbasicsalay)+formatSalay(salayForm.sovertimesalay) +
            formatSalay(salayForm.sprizesalay)+formatSalay(salayForm.ssubsidysalay)-formatSalay(salayForm.attendancesalay)
            -formatSalay(salayForm.taxsalay)-formatSalay(salayForm.fivesalay);
            
        }

        return {
            salayForm,
            departmentList,
            positionList,
            namesList,
            salayNum,
            handlerPositionList,
            handlerStaffNamesList,
            handlerSalayInsertSubmit
           
        }
    }
})
</script>


<style scoped>
    .half-width {
        width: 48%
    }
    .salay-insert-btn {
        width: 150px;
        background-color: #0db3a6;
        margin-top: 15px;
    }
    h3 {
        border-bottom: 2px dashed #ccc;
    }
</style>