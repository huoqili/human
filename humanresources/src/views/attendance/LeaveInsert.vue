<template>
    <div>
        <div class="leave-insert">
            <el-form :model="leaveForm" label-position="top">
                <el-form :inline="true" label-position="center" label-width="50px">
                    <el-form-item label="部门">
                        <el-select v-model="leaveForm.did" placeholder="所在部门" @change="departmentChange(leaveForm.did)">
                            <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-select v-model="leaveForm.pid" placeholder="所处职位" @change="positionChange(leaveForm.pid)">
                            <el-option v-for="item in positionList" :key="'position'+item.pid" :label="item.pname" :value="item.pid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-select v-model="leaveForm.sid" placeholder="请选择">
                            <el-option v-for="item in staffList" :key="'staff'+item.sid" :label="item.sname" :value="item.sid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form-item label="申请日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="leaveForm.aldata" format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="请假类型">
                    <el-select v-model="leaveForm.altype" placeholder="请选择请假类型">
                        <el-option v-for="item in leaveTypeList" :key="'leaveTYpe'+item.id" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事由说明">
                    <el-input v-model="leaveForm.alreason" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="请假日期">
                    <el-date-picker
                        v-model="leaveForm.alslot"
                        type="daterange"
                        range-separator="To"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        @change="change"
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
                    >
                    </el-date-picker>
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
</template>
<script lang="ts">
import { handlerDepartmentList } from '@/http/department';
import { handlerLeaveQuery } from '../../http/normalInfo';
import { DepartmentTable } from '@/type/department';
import { DropDownMenuArr } from '@/type/base';
import { defineComponent, onMounted, reactive,ref } from 'vue';
import { LeaveForm } from '../../type/leaveInsert';
import { PositionList } from '@/type/position';
import { StaffTable } from '@/type/staff';
import { handlerGetPositionList } from '@/http/position';
import { handlerstaffList } from '@/http/staff';
import { handlerLeaveInsert } from "@/http/leave"
import { ElMessage } from 'element-plus';
import { SUCCESS } from '@/config';
export default defineComponent({
    setup(){
        // const store = useStore();
        let departmentList = ref<DepartmentTable>();
        let positionList = ref<PositionList>();
        let staffList = ref<StaffTable>();
        let leaveTypeList = ref<DropDownMenuArr>();
        let leaveForm = reactive<LeaveForm>({
            did:"",
            pid:'',
            sid:'',
            aldata:"",
            altype:"",
            alreason:"",
            alslot:"",
            aldays:0
        });
        //时间差
        const setTime = (beginTime:number ,endTime:number ) =>{
            var dateDiff = endTime - beginTime;//时间差的毫秒数
            var dayDiff = dateDiff / (24 * 3600 * 1000);//计算出相差天数
            // var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
            // var hours=Math.floor(leave1/(3600*1000))//计算出小时数
            return dayDiff;
        }
        //更改时间触发
        const change = () =>{
            let startTime = 0;
            let endTime = 0;
            if(leaveForm.alslot){
                startTime = Date.parse(leaveForm.alslot[0]);
                endTime = Date.parse(leaveForm.alslot[1]);
            }
            leaveForm.aldays = setTime(startTime,endTime);
        }
        //提交按钮
        const handlerSubmit = () =>{
            handlerLeaveInsert(leaveForm).then(res=>{
                if(res.data.code === SUCCESS) {
                    ElMessage.success(res.data.msg);
                }else{
                    ElMessage.warning(res.data.msg);
                }
            })
        }
        //初始化
        let initData = () =>{
            Promise.all([handlerDepartmentList(),handlerLeaveQuery()]).then(res=>{
                departmentList.value = res[0].data.data as DepartmentTable;
                leaveTypeList.value = res[1].data.data as DropDownMenuArr;
            }).catch(err=>{
                console.log(err);
            })
        }
        const departmentChange = (val:string) =>{
            leaveForm.pid = '';
            handlerGetPositionList(val).then(res=>{
                positionList.value = res.data.data as PositionList;
            })
        }
        const positionChange = (val:string) =>{
            leaveForm.sid = '';
            handlerstaffList(val).then(res=>{
                staffList.value = res.data.data as StaffTable;
            })
        }
        // let leaveFormDom:Ref = ref();
        onMounted (()=>{
            initData();
        })
        return{
            leaveForm,
            handlerSubmit,
            change,
            departmentList,
            positionList,
            staffList,
            leaveTypeList,
            departmentChange,
            positionChange
            // leaveFormDom
        }
    }
})
</script>
<style scoped>

</style>