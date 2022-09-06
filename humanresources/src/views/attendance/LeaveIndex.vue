<template>
    <div class="leaveindex">
        <el-form :model="searchForm" :inline="true">
            <el-form-item label="员工部门">
                <el-select clearable v-model="searchForm.did" placeholder="请选择员工部门">
                    <el-option v-for="item in departmentSearchList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请假类型">
                <el-select clearable v-model="searchForm.altype" placeholder="请选择请假类型">
                    <el-option v-for="item in leaveSearchTypeList" :key="'leaveTYpe'+item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="leaveaskTable">
            <el-table-column label="请假员工名" prop="staff.sname"></el-table-column>
            <el-table-column label="员工所属部门" prop="department.dname"></el-table-column>
            <el-table-column label="员工职位" prop="position.pname"></el-table-column>
            <el-table-column label="申请日期" prop="aldata"></el-table-column>
            <el-table-column label="请假类型">
                <template #default="scope">
                    <span>{{leaveTypeList[scope.row.altype]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="请假事由" prop="alreason"></el-table-column>
            <el-table-column label="开始日期" prop="alstart"></el-table-column>
            <el-table-column label="截止日期" prop="alend"></el-table-column>
            <el-table-column label="请假天数" prop="aldays"></el-table-column>
            <el-table-column label="审核" width="200px">
                <template #default="scope">
                    <div v-if="(scope.row.alcheck)">
                        <el-button disabled type="info" size="mini">{{leaveCheckObj[scope.row.alcheck]}}</el-button>
                    </div>
                    <div v-else>
                        <el-button-group>
                            <!-- scope.row.alcheck ? round:disabled -->
                            <el-button size="mini" plain type="primary" @click="handlerPassbtn(scope.row.alid)">通过</el-button>
                            <el-button size="mini" plain type="danger" @click="handlerRejectbtn(scope.row.alid)">驳回</el-button>
                            <router-link :to="{name:'LeaveEdit',query:{alid:scope.row.alid}}">
                                <el-button size="mini" type="success">编辑</el-button>
                            </router-link>
                        </el-button-group>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-pagination
        v-model:currentPage="paginate.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="paginate.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog v-model="editPassDialog" title="通过申请" width="30%">
        <span>您确定通过此申请么？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editPassDialog = false">取消</el-button>
                <el-button type="primary" @click="handlerPass">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="editRejectDialog" title="驳回申请" width="30%">
        <span>您确定驳回此申请么？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editRejectDialog = false">取消</el-button>
                <el-button type="danger" @click="handlerReject">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import {defineComponent,onMounted,ref,reactive} from 'vue';
import {LeaveaskTable} from '@/type/leaveInsert';
import {handlerLerveTable,handlerLeaveUpdate} from '@/http/leave';
import {DropDownMenuArr, Paginate} from "@/type/base";
import { DepartmentTable } from '@/type/department';
import { handlerDepartmentList } from '@/http/department';
import { handlerLeaveQuery } from '@/http/normalInfo';
import { ElMessage } from 'element-plus';
export default defineComponent({
    setup(){
        //行标
        let handlerIndex =ref<number>(0);
        //审核枚举
        let leaveCheckObj = reactive({
            '0': '未审核',
            '1': '审核通过',
            '2': '审核不通过'
        })
        //请假类型枚举
        let leaveTypeList = reactive({
            '1' :'病假',
            '2' :'事假',
            '3' :'婚假',
            '4' : '产假',
            '5' : '产检假',
            '6' : '陪产假'
        })
        //表格初始化
        let leaveaskTable = ref<LeaveaskTable>();
        //部门列表初始化
        let departmentSearchList = ref<DepartmentTable>();
        //请假类型查询枚举
        let leaveSearchTypeList = ref<DropDownMenuArr>();
        //分页
        let paginate = reactive<Paginate>({
            page: 1,
            limit: 10
        });
        //搜索表单
        let searchForm = reactive({
            did: '',
            altype:''
        });
        //搜索按钮
        let handlerSearchSubmit = () =>{
            paginate.page = 1;
            initData();
        }
        //初始化
        let initData = () => {
            let params = Object.assign({},paginate,searchForm);
            handlerLerveTable(params).then(res =>{
                leaveaskTable.value = res.data.data as LeaveaskTable;
                total.value = res.data.count
            }).catch(err =>{
                console.log(err);
            })
        }
        //列表初始化
        let initDataList = () =>{
            Promise.all([handlerDepartmentList(),handlerLeaveQuery()]).then(res=>{
                departmentSearchList.value = res[0].data.data as DepartmentTable;
                leaveSearchTypeList.value = res[1].data.data as DropDownMenuArr;
            }).catch(err=>{
                console.log(err);
            })
        }
        //分页
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
        //驳回通过
        let editPassDialog = ref<boolean>(false);
        let editRejectDialog = ref<boolean>(false);
        //通过
        let handlerPassbtn = (alid:number) =>{
            handlerIndex.value = alid;
            editPassDialog.value = true;
        }
        let handlerPass = () => {
            let data = {alcheck:1};
            handlerLeaveUpdate(handlerIndex.value,data).then(res=>{
                if(res.data.code === 200){
                    ElMessage.success(res.data.msg);
                    paginate.page = 1;
                    initData();
                    editPassDialog.value = false;
                }
            }).catch(err=>{
                console.log(err);
            })
        }
        //驳回
        let handlerRejectbtn = (alid:number) =>{
            handlerIndex.value = alid;
            editRejectDialog.value = true;
        }
        let handlerReject = () => {
            let data = {alcheck:2};
            handlerLeaveUpdate(handlerIndex.value,data).then(res=>{
                if(res.data.code === 200){
                    ElMessage.success(res.data.msg);
                    paginate.page = 1;
                    initData();
                    editRejectDialog.value = false;
                }
            }).catch(err=>{
                console.log(err);
            })
        }
        onMounted(()=>{
            initData();
            initDataList();
        })
        return{
            leaveCheckObj,
            leaveaskTable,
            leaveTypeList,
            searchForm,
            handlerSearchSubmit,
            leaveSearchTypeList,
            departmentSearchList,
            paginate,
            total,
            handleSizeChange,
            handleCurrentChange,
            handlerIndex,
            handlerPass,
            handlerPassbtn,
            editPassDialog,
            handlerReject,
            handlerRejectbtn,
            editRejectDialog
        }
    }
})
</script>
<style scoped>

</style>