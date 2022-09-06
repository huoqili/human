<template>
    <div class="leaveindex">
        <el-form :model="searchForm" :inline="true">
            <el-form-item label="员工部门">
                <el-select clearable v-model="searchForm.did" placeholder="请选择员工部门">
                    <el-option v-for="item in departmentSearchList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出差地址">
                <el-input v-model="searchForm.btaddress" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="请假类型">
                <el-select clearable v-model="searchForm.altype" placeholder="请选择请假类型">
                    <el-option v-for="item in leaveSearchTypeList" :key="'leaveTYpe'+item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="businessAskTable">
            <el-table-column label="出差申请员工名" prop="staff.sname"></el-table-column>
            <el-table-column label="员工所属部门" prop="department.dname"></el-table-column>
            <el-table-column label="员工职位" prop="position.pname"></el-table-column>
            <el-table-column label="申请日期" prop="btdata"></el-table-column>
            <el-table-column label="出差开始日期" prop="btstart"></el-table-column>
            <el-table-column label="出差截止日期" prop="btend"></el-table-column>
            <el-table-column label="出差天数" prop="btdays"></el-table-column>
            <el-table-column label="出差事由" prop="btreason"></el-table-column>
            <el-table-column label="出差地点" prop="btaddress"></el-table-column>
            <el-table-column label="备注" prop="btremarks"></el-table-column>
            <el-table-column label="审核" width="200px">
                <template #default="scope">
                    <div v-if="(scope.row.btcheck)">
                        <el-button disabled type="info" size="mini">{{businessCheckObj[scope.row.btcheck]}}</el-button>
                    </div>
                    <div v-else>
                        <el-button-group>
                            <el-button size="mini" plain type="primary" @click="handlerPassbtn(scope.row.btid)">通过</el-button>
                            <el-button size="mini" plain type="danger" @click="handlerRejectbtn(scope.row.btid)">驳回</el-button>
                            <router-link :to="{name:'BusinessTravelEdit',query:{btid:scope.row.btid}}">
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
import {BusinessAskTable} from '@/type/businessTravel';
import {handlerBusinessTable,handlerBusinessUpdate} from '@/http/businessTravel';
import { Paginate } from "@/type/base";
import { DepartmentTable } from '@/type/department';
import { handlerDepartmentList } from '@/http/department';
import { ElMessage } from 'element-plus';
// import { handlerAddress } from '../../http/normalInfo';
export default defineComponent({
    setup(){
        //行标
        let handlerIndex =ref<number>(0);
        //审核枚举
        let businessCheckObj = reactive({
            '0': '未审核',
            '1': '审核通过',
            '2': '审核不通过'
        })
        // const options = ref();
        //表格初始化
        let businessAskTable = ref<BusinessAskTable>();
        //部门列表初始化
        let departmentSearchList = ref<DepartmentTable>();
        //分页
        let paginate = reactive<Paginate>({
            page: 1,
            limit: 10
        });
        //搜索表单
        let searchForm = reactive({
            did: '',
            btaddress:''
        });
        //搜索按钮
        let handlerSearchSubmit = () =>{
            paginate.page = 1;
            initData();
        }
        //初始化
        let initData = () => {
            let params = Object.assign({},paginate,searchForm);
            handlerBusinessTable(params).then(res =>{
                // console.log(res);
                businessAskTable.value = res.data.data as BusinessAskTable;
                total.value = res.data.count
            }).catch(err =>{
                console.log(err);
            })
        }
        //列表初始化
        let initDataList = () =>{
            Promise.all([handlerDepartmentList()]).then(res=>{
                departmentSearchList.value = res[0].data.data as DepartmentTable;
                // options.value = res[1].data.data;
                // console.log(options);
            }).catch(err=>{
                console.log(err);
            })
        }
        //分页
        let total = ref<number>();
        //单页数改变
        let handleSizeChange = (value:number) => {
            paginate.limit = value;
            paginate.page = 1;
            initData();
        }
        //页码改变
        let handleCurrentChange = (value:number) => {
            paginate.page = value;
            initData();
        }
        //驳回通过显示窗口
        let editPassDialog = ref<boolean>(false);
        let editRejectDialog = ref<boolean>(false);
        //通过
        let handlerPassbtn = (btid:number) =>{
            handlerIndex.value = btid;
            editPassDialog.value = true;
        }
        let handlerPass = () => {
            let data = {btcheck:1};
            handlerBusinessUpdate(handlerIndex.value,data).then(res=>{
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
        let handlerRejectbtn = (btid:number) =>{
            handlerIndex.value = btid;
            editRejectDialog.value = true;
        }
        let handlerReject = () => {
            let data = {btcheck:2};
            handlerBusinessUpdate(handlerIndex.value,data).then(res=>{
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
            // options,地址舍弃
            //表格审核对象
            businessCheckObj,
            //表格
            businessAskTable,
            //搜索表单
            searchForm,
            //搜索按钮
            handlerSearchSubmit,
            // leaveSearchTypeList,
            departmentSearchList,
            //分页
            paginate,
            total,
            handleSizeChange,
            handleCurrentChange,
            //行标
            handlerIndex,
            //审核通过驳回
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