<template>
    <div>
        <el-table :data="feedbackTable" border>
            <el-table-column prop="sname" label="员工姓名"></el-table-column>
            <el-table-column prop="snumber" label="员工编号"></el-table-column>
            <el-table-column prop="freason" label="反馈原因"></el-table-column>
            <el-table-column prop="ftimes" label="反馈时间"></el-table-column>
            <el-table-column label="操作">
                    <template #default="scope">
                        <div v-if="scope.row.fstate === 0">
                            <el-button type="warning" @click="handlerFeedStateChange(scope.row.fid,1)">驳回</el-button>
                            <el-button type="primary" @click="handlerFeedStateChange(scope.row.fid,2)">批准</el-button>
                        </div>
                        <div v-if="scope.row.fstate === 1">
                            <span class="unsure">已驳回</span>
                        </div>
                        <div v-if="scope.row.fstate === 2">
                            <span class="sure">已批准</span>
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
import { defineComponent,onMounted, reactive, ref } from 'vue'
import { Paginate } from '../../type/base'
import { handlerSalayFeedBackIndex } from '../../http/salayfeed'
import { FeedBackTable } from '../../type/salay'
import { handlerSalayFeedStateChange } from '../../http/salayfeed'
import { SUCCESS } from '@/config'
import { ElMessage } from 'element-plus'


export default defineComponent({
    setup() {
        let paginate = reactive<Paginate>({
            page: 1,
            limit: 5
        });

        let total = ref<number>();
        let feedbackTable = ref<FeedBackTable>();

        let initData = function() {
            handlerSalayFeedBackIndex(paginate).then(res => {
                if(res.data.data) {
                    feedbackTable.value = res.data.data as FeedBackTable; 
                    total.value = res.data.count;
                }
            }).catch(err => {
                console.log(err);
            })
        }

        let handleSizeChange = (val: number) => {
            paginate.page = 1;
            paginate.limit = val;
            initData();
        }

        let handleCurrentChange = (val: number) => {
            paginate.page = val;
              initData();
        }

        let handlerFeedStateChange = (fid:string, state: number) => {
            handlerSalayFeedStateChange(fid,state).then(res => {
                if(res.data.code === SUCCESS) {
                    ElMessage.success(res.data.msg);
                    initData();
     
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
            feedbackTable,
            paginate,
            total,
            handlerFeedStateChange,
            handleSizeChange,
            handleCurrentChange
        }
    }
})
</script>


<style>
 .sure {
        color: #0d84ff;
    }
    .unsure {
        color: #f23c3c;
    }
</style>