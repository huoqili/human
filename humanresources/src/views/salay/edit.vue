<template>
  <div class="salay-edit">
     <el-form :model="salayEditForm">
       <el-form-item label="职工职位">
         <el-input v-model="salayEditForm['position.pname']" readonly style="width: 500px"></el-input>
       </el-form-item>
       <el-form-item label="职工名称" >
         <el-input v-model="salayEditForm.sname" readonly style="width: 500px"></el-input>
       </el-form-item>
       <el-form-item label="职工电话" >
         <el-input v-model="salayEditForm.sphone" readonly style="width: 500px"></el-input>
       </el-form-item>
       
      <el-form-item>
                <h3>#工资明细#</h3>
            </el-form-item>
       
            <el-form :inline="true" label-position="top">
                <el-form-item label="基本工资" class="half-width">
                    <el-input v-model="salayEditForm.sbasicsalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
                <el-form-item label="加班薪资" class="half-width">
                    <el-input v-model="salayEditForm.sovertimesalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
            </el-form>

            <el-form-item>
                <h3>#奖金补贴#</h3>
            </el-form-item>

            <el-form :inline="true" label-position="top">
                <el-form-item label="奖金" class="half-width">
                    <el-input v-model="salayEditForm.sprizesalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
                <el-form-item label="补贴" class="half-width">
                    <el-input v-model="salayEditForm.ssubsidysalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
            </el-form>

            <el-form-item>
                <h3>#扣款项#</h3>
            </el-form-item>

            <el-form :inline="true" label-position="top">
                <el-form-item label="考勤扣款" class="half-width">
                    <el-input v-model="salayEditForm.attendancesalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
                <el-form-item label="五险一金代扣" class="half-width">
                    <el-input v-model="salayEditForm.fivesalay" type="number" class="half-width" @change="salayNum"></el-input>
                </el-form-item>
                 <el-form-item label="个税代扣" class="half-width">
                    <el-input class="half-width" type="number" v-model="salayEditForm.taxsalay" @change="salayNum"></el-input>
                </el-form-item>
            </el-form>
           

            <el-form-item >
                <h3>#工资合计#</h3>
            </el-form-item>

            <el-form label-position="top">
                 <el-form-item label="实发工资" class="half-width" >
                    <el-input type="number" readonly v-model="salayEditForm.factsalay" class="half-width"></el-input>
                </el-form-item>
            </el-form>

             <el-form-item>
                <el-button class="salay-insert-btn" type="primary" @click="handlerSalayUpdateSubmit">提交编辑</el-button>
            </el-form-item>

     </el-form>
  </div>
</template>

<script lang="ts">
import { SUCCESS } from '@/config'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { handlerSalayOne,handlerSalayUpdate } from '../../http/salay'
import { SalayForm } from '../../type/salay'


export default defineComponent({
   setup() {
     let route = useRoute();
      let router = useRouter();
     let salayEditForm = ref<SalayForm>({
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

     

      let initData = () => {
          let sid = route.query.sid as string;
          handlerSalayOne(sid).then(res => {
              if(res.data.code === SUCCESS) {
                salayEditForm.value = res.data.data as SalayForm;
                
                
              }else{
                ElMessage.warning(res.data.msg);
              }
          }).catch(err => {
            console.log(err);
          })
      }

      let formatSalay = (salay:string) => {
            return salay ? Number.parseInt(salay) : 0;
        }

        let salayNum = () => {
            salayEditForm.value.factsalay = formatSalay(salayEditForm.value.sbasicsalay)+formatSalay(salayEditForm.value.sovertimesalay) +
            formatSalay(salayEditForm.value.sprizesalay)+formatSalay(salayEditForm.value.ssubsidysalay)-formatSalay(salayEditForm.value.attendancesalay)
            -formatSalay(salayEditForm.value.taxsalay)-formatSalay(salayEditForm.value.fivesalay);

        }

      let handlerSalayUpdateSubmit = () => {
          handlerSalayUpdate(salayEditForm.value).then(res => {
            if(res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg);
              router.push({name: 'salay'});
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
        salayEditForm,
        salayNum,
        handlerSalayUpdateSubmit
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