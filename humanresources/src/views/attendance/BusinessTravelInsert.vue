<template>
    <div>
        <div class="business-insert">
            <el-form :model="businessForm" label-position="top">
                <el-form :inline="true" label-position="center" label-width="50px">
                    <el-form-item label="部门">
                        <el-select v-model="businessForm.did" clearable placeholder="所在部门" @change="departmentChange(businessForm.did)">
                            <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-select v-model="businessForm.pid" clearable placeholder="所处职位" @change="positionChange(businessForm.pid)">
                            <el-option v-for="item in positionList" :key="'position'+item.pid" :label="item.pname" :value="item.pid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出差人姓名" label-width="100px">
                        <el-select v-model="businessForm.sid" clearable placeholder="请选择">
                            <el-option v-for="item in staffList" :key="'staff'+item.sid" :label="item.sname" :value="item.sid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form-item label="申请日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="businessForm.btdata" format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="出差起止日期">
                    <el-date-picker
                        v-model="businessForm.btslot"
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
                <el-form-item label="出差天数">
                    <el-input v-model="businessForm.btdays" disabled></el-input>
                </el-form-item>
                <el-form-item label="出差事由">
                    <el-input v-model="businessForm.btreason" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="出差地点">
                    <el-input v-model="businessForm.btaddress"></el-input>
                </el-form-item>
                <!-- <el-form-item label="出差地点">
                    <el-cascader
                        v-model="businessForm.btaddress"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        clearable
                    ></el-cascader>
                </el-form-item> -->
                <el-form-item label="备注">
                    <el-input v-model="businessForm.btremarks"></el-input>
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
// import { handlerAddress } from '../../http/normalInfo';
import { DepartmentTable } from '@/type/department';
// import { DropDownMenuArr } from '@/type/base';
import { defineComponent, onMounted, reactive,ref,toRefs } from 'vue';
import { BusinessForm } from '../../type/businessTravel';
import { PositionList } from '@/type/position';
import { StaffTable } from '@/type/staff';
import { handlerGetPositionList } from '@/http/position';
import { handlerstaffList } from '@/http/staff';
import { handlerBusinessInsert } from "@/http/businessTravel"
import { ElMessage } from 'element-plus';
import { SUCCESS } from '@/config';
export default defineComponent({
    setup(){
        //地址json
        // const state = reactive({
        //     value: [],
        //     options: []
        // })
        let departmentList = ref<DepartmentTable>();
        let positionList = ref<PositionList>();
        let staffList = ref<StaffTable>();
        let businessForm = reactive<BusinessForm>({
            did:"",
            pid:'',
            sid:'',
            btdata:"",
            btslot:"",
            btdays:0,
            btreason:"",
            btaddress:'',
            btremarks:''
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
            if(businessForm.btslot){
                startTime = Date.parse(businessForm.btslot[0]);
                endTime = Date.parse(businessForm.btslot[1]);
            }
            businessForm.btdays = setTime(startTime,endTime);
        }
        //提交按钮
        const handlerSubmit = () =>{
            handlerBusinessInsert(businessForm).then(res=>{
                if(res.data.code === SUCCESS) {
                    ElMessage.success(res.data.msg);
                }else{
                    ElMessage.warning(res.data.msg);
                }
            })
        }
        //初始化
        let initData = () =>{
            Promise.all([handlerDepartmentList()]).then(res=>{
                departmentList.value = res[0].data.data as DepartmentTable;
                // state.options = res[1].data.data as any;
            }).catch(err=>{
                console.log(err);
            })
        }
        //部门更改联动
        const departmentChange = (val:string) =>{
            businessForm.pid = '';
            handlerGetPositionList(val).then(res=>{
                positionList.value = res.data.data as PositionList;
            })
        }
        //职位更改联动
        const positionChange = (val:string) =>{
            businessForm.sid = '';
            handlerstaffList(val).then(res=>{
                staffList.value = res.data.data as StaffTable;
            })
        }
        onMounted (()=>{
            initData();
        })
        return{
            businessForm,
            handlerSubmit,
            change,//修改申请日期触发
            departmentList,
            positionList,
            staffList,
            departmentChange,
            positionChange,
            // ...toRefs(state)地址舍弃
        }
    }
})
</script>
<style scoped>

</style>