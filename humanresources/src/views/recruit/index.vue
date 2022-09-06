<template>
    <div class="recruit-query">
        <el-form class="search-form" :inline="true" label-position="top">
             <el-form-item label="日期时间" class="salay-area">
                 <el-date-picker
                    style="width: 160px"
                    v-model="searchForm.minTimes"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <span> ~ </span>
              <el-date-picker
                    style="width: 160px"
                    v-model="searchForm.maxTimes"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
            </el-form-item>

            <el-form-item label="需求部门" class="salay-area search-sname">
                <el-select clearable v-model="searchForm.did" placeholder="请选择职工职位" @change="handlerPositionList">
                    <el-option v-for="item in departmentList" :key="'department'+item.did" :label="item.dname" :value="item.did"></el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="需求职位" class="salay-area search-sname">
                <el-select clearable v-model="searchForm.pid" placeholder="需求职位">
                     <el-option v-for="item in positionList" :key="'position'+item.pid" :label="item.pname" :value="item.pid"></el-option>
                  </el-select>   
            </el-form-item>

            <el-form-item class="salay-area search-btn" @click="handlerSalarySearch">
                <p>筛选</p>
            </el-form-item>
        </el-form>


        <el-table :data="recruitTable" border>
            <el-table-column prop="rtimes" label="日期时间"></el-table-column>
            <el-table-column prop="department.dname" label="需求部门"></el-table-column>
            <el-table-column prop="rname" label="申请人"></el-table-column>
            <el-table-column prop="position.pname" label="需求岗位"></el-table-column>
            <el-table-column prop="rnum" label="招聘人数"></el-table-column>
            <el-table-column prop="rsalayarea" label="薪酬建议"></el-table-column>
            <el-table-column prop="rreason" label="招聘原因"></el-table-column>
            <el-table-column prop="rduty" label="岗位职责"></el-table-column>
            <el-table-column prop="rcondition" label="任职条件"></el-table-column>
            <el-table-column prop="arrive" label="期望到岗时间"></el-table-column>
            <el-table-column label="紧急程度" >
                <template #default="scope">
                    <span>{{ urgentArr[scope.row.urgent] }}</span>
                </template>
            </el-table-column>
            <el-table-column width="180" label="操作">
                <template #default="scope">
                   <router-link :to="{name: 'recruitedit',query: {rid: scope.row.rid }}" >
                        <el-button type="primary">编辑</el-button>
                    </router-link>
                    <el-button type="danger" @click="handlerRecruitDeleteBtn(scope.row.rid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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

        <el-dialog
            v-model="editDeleteDialog"
            title="招聘信息删除"
            width="30%"
        >
        <span>您确定要删除么</span>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="editDeleteDialog = false">取消</el-button>
            <el-button type="warning" @click="handlerRecruitDeleteSubmit">确定</el-button>
        </span>
        </template>
     </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { Paginate } from '../../type/base'
import { handlerGetRecruitIndex,handlerRecruitDelete } from '../../http/recruit'
import { RecruitTable } from '../../type/recruit'
import { ElMessage } from 'element-plus'
import { SUCCESS } from '@/config'
import { DepartmentTable } from '../../type/department'
import { handlerDepartmentList } from '../../http/department'
import { handlerGetPositionList } from '../../http/position'
import { PositionList } from '../../type/position'

export default defineComponent({
    setup() {
        let paginate = reactive<Paginate>({
            page: 1,
            limit: 5
        })
        let total = ref<number>();
        let editDeleteDialog = ref<boolean>(false);
          let editDeleteIdx = ref<number>(0);
           let departmentList = ref<DepartmentTable>();

        let searchForm = reactive({
                did: '',
                pid: '',
                minTimes: '',
                maxTimes: ''
        });

        let handleSizeChange = (value:number) => {
             paginate.limit = value;
             paginate.page = 1;
             initData();
        }

        let handleCurrentChange = (value:number) => {
                paginate.page = value;
                initData();
        }
        let positionList = ref<PositionList>();

        let urgentArr = {
            0: '一般',
            1: '紧急'
        }

         let handlerPositionList = () => {
          handlerGetPositionList(searchForm.did).then(res => {
            if(res.data.code === SUCCESS) {
              searchForm.pid = '';
              positionList.value = res.data.data as PositionList;
            }else{
              ElMessage.warning(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
        }
      

        let handlerRecruitDeleteBtn = (rid:number) => {
            editDeleteDialog.value = true;
            editDeleteIdx.value = rid;
        }

        let recruitTable = ref<RecruitTable>();
        let handlerRecruitDeleteSubmit = () => {
            handlerRecruitDelete(editDeleteIdx.value).then(res => {
                if(res.data.code === SUCCESS) {
                    ElMessage.success(res.data.msg);
                     paginate.page = 1;
                    initData();
                    editDeleteDialog.value = false;
                }else{
                    ElMessage.warning(res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        }

        let initData = () => {
            let params = Object.assign({},paginate,searchForm);
            handlerGetRecruitIndex(params).then(res => {
                if(res.data.data) {
                    recruitTable.value = res.data.data as RecruitTable;
                    total.value = res.data.count;
                }else{
                    ElMessage.warning(res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            })
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

         let handlerSalarySearch = () => {
             paginate.page = 1;
            initData();
        }

        onMounted(() => {
            initData();
        })

        return {
            paginate,
            total,
            recruitTable,
            urgentArr,
            editDeleteDialog,
            searchForm,
            departmentList,
            positionList,
            handleSizeChange,
            handleCurrentChange,
            handlerRecruitDeleteBtn,
            handlerRecruitDeleteSubmit,
            handlerPositionList,
            handlerSalarySearch

        }
    }
})
</script>


<style scoped>
 .search-form {
        background-color: #eee;
        margin-bottom: 20px;
        padding: 15px 0 0 15px;
    }
    .salay-area {
        background-color: #fff;
        padding: 15px;
    }  
    .search-sname {
            flex-grow: 1;
    }
    .search-btn {
        width:140px;
        background-color: #0DB3A6;
        opacity: 0.7;
        cursor: pointer;
       
    } 
    .search-btn p {
        font-size: 30px;
        color: #fff;
        text-align: center;
        margin-top: 25px; 
    }  
</style>