<template>
    <div class="department-edit">
        <el-form :model="departmentForm[0]" :rules="departmentRules" ref="departmenteditdom">
            <el-form-item label="部门编号" prop="dnum">
                <el-input v-model="departmentForm[0].dnum"></el-input>
            </el-form-item>
            <el-form-item label="部门名称" prop="dname">
                <el-input v-model="departmentForm[0].dname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerDepartmentEdit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'
import { handlerDepartmentShow,handlerDepartmentUpdate } from '../../http/department'
import { DepartmentForm,DepartmentRules } from '../../type/department'
import { SUCCESS } from '../../config/index'
import { ElMessage } from 'element-plus'

export default defineComponent({
    setup() {
        let route =useRoute();
        let did = ref<string>('');
        let departmentForm = reactive<DepartmentForm[]>([{did:0,dnum:'',dname:''}]);
        
        let departmenteditdom:Ref = ref();

        let departmentRules = reactive<DepartmentRules>({
             dnum: [
                {required: true, message: '部门编号必填', trigger: 'blur'},
                {min:1,max:20,message:'长度在1-20字符',trigger:'blur'}
            ],
            dname: [
                 {required: true, message: '部门名称必填', trigger: 'blur'},
                 {min:3,max:10,message:'长度在3-10字符',trigger:'blur'}
            ]
        });

        let initDepartmentData = () => {
            handlerDepartmentShow(did.value).then(res => {
                if(res.data.code === SUCCESS) {
                    let data = res.data.data;
                    departmentForm[0] = data as DepartmentForm;
                }
            }).catch(err => {
                console.log(err);
            })
        }

        let handlerDepartmentEdit = () => {
            departmenteditdom.value.validate((valid:boolean) => {
                if(!valid) return;
                handlerDepartmentUpdate(did.value,departmentForm[0]).then(res => {
                    if(res.data.code === SUCCESS) {
                        ElMessage.success(res.data.msg);
                    }else{
                        ElMessage.warning(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        onMounted(() => {
            let dids = route.query.did as string;
            did.value = dids;
            initDepartmentData();
        })

        return {
            departmentForm,
            departmentRules,
            departmenteditdom,
            handlerDepartmentEdit
        }
    }
})
</script>


<style scoped>
 .department-edit {
        width: 450px;
        box-shadow: 0 0 3px #333333;
        padding: 50px 30px;
    }
    .el-form-item {
        margin-bottom: 40px;
    }
  
</style>