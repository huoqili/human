<template>
    <div class="salay-query">
        <el-form class="search-form" :inline="true" label-position="top">
             <el-form-item label="工资发放时间" class="salay-area">
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

            <el-form-item label="薪资区间" class="salay-area">
                <el-input type="number" v-model="searchForm.minSalay" style="width: 160px"></el-input>
                <span> ~ </span>
                <el-input type="number" v-model="searchForm.maxSalay" style="width: 160px"></el-input>
            </el-form-item>

            <el-form-item label="职工姓名" class="salay-area search-sname">
                <el-input v-model="searchForm.sname" style="width: 100%"></el-input>
            </el-form-item>

            <el-form-item class="salay-area search-btn" @click="handlerSalarySearch">
                <p>筛选</p>
            </el-form-item>
        </el-form>

        <el-table style="salay-table" border height="327" :data="salayTable" @row-click="handlerRowClick" >
            <el-table-column label="工资发放时间" prop="stime"></el-table-column>
             <el-table-column label="姓名" prop="sname"></el-table-column>
             <el-table-column label="职位" prop="position.pname"></el-table-column>
             <el-table-column label="手机号码" prop="sphone"></el-table-column>
             <el-table-column label="基本工资" prop="sbasicsalay"></el-table-column>
             <el-table-column label="加班工资" prop="sovertimesalay"></el-table-column>
             <el-table-column label="奖金" prop="sprizesalay"></el-table-column>
             <el-table-column label="补贴" prop="ssubsidysalay"></el-table-column>
             <el-table-column label="考勤扣款" prop="attendancesalay"></el-table-column>
             <el-table-column label="五险一金代扣" prop="fivesalay"></el-table-column>
             <el-table-column label="个税代扣" prop="taxsalay"></el-table-column>
             <el-table-column label="实发工资" prop="factsalay"></el-table-column>
              <el-table-column label="状态">
                  <template #default="scope">
                        <div :class="scope.row.ssure === 0 ? 'unsure':'sure'">
                            <span>{{hasSure[scope.row.ssure]}}</span>
                        </div>
                          
                  </template>
              </el-table-column>
        </el-table>
          <el-pagination
          style="margin-top:20px"
            v-model:currentPage="paginate.page"
            :page-sizes="[4, 8, 12, 15]"
            :page-size="paginate.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            >
        </el-pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,ref } from 'vue'
import { SalayTable } from '../../type/salay'
import { Paginate } from '../../type/base'
import { handlerSalayTable } from '../../http/salay'
import { SUCCESS } from '@/config'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {

        let salayTable = ref<SalayTable>();

        let router = useRouter();
        
        let searchForm = reactive({
            sname: '',
            minSalay: '',
            maxSalay: '',
            minTimes: '',
            maxTimes: ''
        });

        let hasSure = {
            0 : '未确认',
            1 : '已确认'
        }

        let handlerRowClick = (row:Record<string,any>) => {
            let {sid, ssure} = row;
            if(ssure === 0) {
                router.push({name: 'salayedit',query:{sid}});
            }
            if(ssure === 1) {
                 router.push({name: 'salayread',query:{sid}});
            }
        }

        let paginate = reactive<Paginate>({
            page: 1,
            limit: 4
        });
        let total = ref<number>();

        let handleSizeChange = (val: number) => {
            paginate.page = 1;
            paginate.limit = val;
            initSalayTable();
        }

        let handleCurrentChange = (val: number) => {
            paginate.page = val;
             initSalayTable();
        }

        let handlerSalarySearch = () => {
             paginate.page = 1;
            initSalayTable();
        }

        let initSalayTable = () => {
            let params = Object.assign({},searchForm,paginate);
            handlerSalayTable(params).then(res => {
                if(res.data.code === SUCCESS) {
                   
                    total.value = res.data.count;
                    salayTable.value = res.data.data as SalayTable;
                }else{
                    ElMessage.warning(res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            })

        }
       
        onMounted(() => {
            initSalayTable();
        })
        return {
            salayTable,
            paginate,
            searchForm,
            total,
            hasSure,
            handlerRowClick,
            handleSizeChange,
            handleCurrentChange,
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
    .sure {
        color: #0d84ff;
    }
    .unsure {
        color: #f23c3c;
    }
    
 
    
</style>