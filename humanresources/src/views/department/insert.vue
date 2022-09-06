<template>
    <div class="department-insert">
        <el-form :model="departmentForm" :rules="departmentRules" ref="departmentformdom">
            <el-form-item prop="dnum" label="部门编号">
                <el-input v-model="departmentForm.dnum" placeholder="请输入部分编号"></el-input>
            </el-form-item>
             <el-form-item prop="dname" label="部门名称">
                <el-input v-model="departmentForm.dname" placeholder="长度3-10个字符"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="handlerFormSubmit">提交</el-button>
        </el-form-item>
        </el-form>
        
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref,Ref } from 'vue'
import { ReturnDepartmentInsertSetup,DepartmentForm } from '../../type/department'
import { handlerDepartmentInsert } from '../../http/department'
import { SUCCESS } from '@/config'
import { ElMessage } from 'element-plus'
export default defineComponent({
    setup():ReturnDepartmentInsertSetup{
        let departmentForm = reactive<DepartmentForm>({
            dnum: "",
            dname: ""
        })
        let departmentRules = {
            dnum: [
                {required: true, message: '部门编号必填', trigger: 'blur'},
                {min:1,max:20,message:'长度在1-20个字符',trigger:'blur'}
            ],
            dname: [
                 {required: true, message: '部门名称必填', trigger: 'blur'},
                 {min:3,max:10,message:'长度在3-10字符',trigger:'blur'}
            ]
        }

        let departmentformdom: Ref = ref();

        let handlerFormSubmit = () => {
            departmentformdom.value.validate((valid:boolean) => {
                if(!valid) return;
                handlerDepartmentInsert(departmentForm).then(res => {
                    if(res.data.code === SUCCESS) {
                        ElMessage.success(res.data.msg)
                    }else {
                        ElMessage.warning(res.data.msg);
                    }
                }).catch(err => { 
                    console.log(err);
                })
            })   
        }
        

        return {
            departmentForm,
            departmentRules,
            departmentformdom,
            handlerFormSubmit
        }
    }
})
</script>
<style scoped>
    .department-insert {
        width: 450px;
        box-shadow: 0 0 3px #333333;
        padding: 50px 30px;
    }
    .el-form-item {
        margin-bottom: 40px;
    }
</style>
