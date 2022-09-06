<template>
    <div class="business-edit">
        <div>
        <div class="leave-insert">
            <el-form :model="businessTravelForm" label-position="top">
                <el-form-item label="部门">
                    <el-input v-model="businessTravelForm.dname" disabled></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="businessTravelForm.pname" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="businessTravelForm.sname" disabled></el-input>
                </el-form-item>
                <el-form-item label="申请日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="businessTravelForm.btdata"  format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="businessTravelForm.btstart" format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                    <el-date-picker type="date" placeholder="选择结束日期" v-model="businessTravelForm.btend" @change="handlerChangeEnd"  format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="合计请假天数">
                    <el-input v-model="businessTravelForm.btdays" disabled></el-input>
                </el-form-item>
                <el-form-item label="事由说明">
                    <el-input v-model="businessTravelForm.btreason" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="出差地址">
                    <el-input v-model="businessTravelForm.btaddress" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="businessTravelForm.btremarks" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handlerSubmit" type="primary" size="small">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import {defineComponent,onMounted,ref} from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { SUCCESS } from '@/config';
import { BusinessTable } from '@/type/businessTravel';
import { handlerBusinessShow, handlerBusinessUpdate } from '@/http/businessTravel';
export default defineComponent({
    setup(){
        let route = useRoute();
        let businessTravelForm = ref<BusinessTable>({
            dname:"",
            pname:'',
            sname:'',
            btdata:"",
            btstart:"",
            btend:"",
            btdays:0,
            btreason:"",
            btaddress:'',
            btremarks:''
        });
        //时间差
        const setTime = (beginTime:number ,endTime:number ) =>{
            var dateDiff = endTime - beginTime;//时间差的毫秒数
            var dayDiff = dateDiff / (24 * 3600 * 1000);//计算出相差天数
            return dayDiff;
        }
        // //更改时间触发
        const handlerChangeEnd = () =>{
            let startTime = 0;
            let endTime = 0;
            if(businessTravelForm.value){
                startTime = Date.parse(businessTravelForm.value.btstart);
                endTime = Date.parse(businessTravelForm.value.btend);
            }
            businessTravelForm.value.btdays = setTime(startTime,endTime);
        }
        //初始化
        let initDate = () =>{
            let btid = route.query.btid as string;
            handlerBusinessShow(btid).then(res=>{
                console.log(res);
                if(res.data.code === SUCCESS){
                    businessTravelForm.value = res.data.data as BusinessTable;
                }
            }).catch(err=>{
                console.log(err);
            });
        }
        //提交事件
        const handlerSubmit = () =>{
            handlerBusinessUpdate(businessTravelForm.value.btid as number, businessTravelForm.value).then(res => {
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
            initDate()
        })
        return{
            businessTravelForm,
            handlerChangeEnd,
            handlerSubmit
        }
    }
})
</script>

<style>

</style>