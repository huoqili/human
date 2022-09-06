<template>
    <div class="leave-edit">
        <div>
        <div class="leave-insert">
            <el-form :model="leaveForm" label-position="top">
                <el-form-item label="部门">
                    <el-input v-model="leaveForm.dname" disabled></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="leaveForm.pname" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="leaveForm.sname" disabled></el-input>
                </el-form-item>
                <el-form-item label="申请日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="leaveForm.aldata"  format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="请假类型">
                    <el-select v-model="leaveForm.altype" placeholder="请选择请假类型">
                        <el-option v-for="item in leaveTypeList" :key="'leaveType'+item.id" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事由说明">
                    <el-input v-model="leaveForm.alreason" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="leaveForm.alstart" format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                    <el-date-picker type="date" placeholder="选择结束日期" v-model="leaveForm.alend" @change="handlerChangeEnd"  format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="合计请假天数">
                    <el-input v-model="leaveForm.aldays" disabled></el-input>
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
import {LeaveTable} from '@/type/leaveInsert'
import {handlerLeaveaskShow} from '@/http/leave'
import { useRoute } from 'vue-router';
import { SUCCESS } from '@/config';
import { DropDownMenuArr } from '@/type/base';
import { handlerLeaveQuery } from '@/http/normalInfo';
import { handlerLeaveUpdate } from '@/http/leave';
export default defineComponent({
    setup(){
        let route = useRoute();
        let leaveTypeList = ref<DropDownMenuArr>();
        let leaveForm = ref<LeaveTable>({
            dname:"",
            pname:'',
            sname:'',
            aldata:"",
            altype:"",
            alreason:"",
            alstart:"",
            alend:'',
            aldays:0
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
            if(leaveForm.value){
                startTime = Date.parse(leaveForm.value.alstart);
                endTime = Date.parse(leaveForm.value.alend);
            }
            leaveForm.value.aldays = setTime(startTime,endTime);
        }
        //初始化
        let initDate = () =>{
            let alid = route.query.alid as string;
            handlerLeaveaskShow(alid).then(res=>{
                console.log(res);
                if(res.data.code === SUCCESS){
                    leaveForm.value = res.data.data as LeaveTable;
                }
            }).catch(err=>{
                console.log(err);
            });
            handlerLeaveQuery().then(res=>[
                leaveTypeList.value = res.data.data as DropDownMenuArr
            ]).catch(err=>{
                console.log(err)
            })
        }
        //提交事件
        const handlerSubmit = () =>{
            handlerLeaveUpdate(leaveForm.value.alid as number, leaveForm.value).then(res => {
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
            leaveForm,
            leaveTypeList,
            handlerChangeEnd,
            handlerSubmit
        }
    }
})
</script>

<style>

</style>