<template>
  <div class="login-bg">
    <div class="login">
      <el-form
        ref="ruleForm"
        :model="loginForm"
        :rules="ruleLogin"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密   码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import { LoginForm, LoginRules } from "@/type/login";
import { SUCCESS } from '@/config';
import { handlerLogin } from '@/http/login'
import { ElMessage } from "element-plus";
import router from '../../router/index';
import store from '../../store/index';
export default defineComponent({
  name: "login",
  setup() {
    let loginForm = reactive<LoginForm>({
      username: "",
      password: "",
    });

    const ruleLogin: LoginRules = {
      username: [
        { min: 3, max: 10, message: "3-10个字符", trigger: "blur" },
        { required: true, message: "用户名必填", trigger: "blur" },
      ],
      password: [
        { min: 3, max: 10, message: "3-10个字符", trigger: "blur" },
        { required: true, message: "用户名必填", trigger: "blur" },
      ],
    };
    let ruleForm = ref();
    const submitForm = () => {
      console.log(ruleForm.value);
      ruleForm.value.validate((valid: boolean) => {
        if(valid) {
          handlerLogin(loginForm).then(res =>{
            if(res.data.code === SUCCESS) {
              ElMessage.success(res.data.msg); 

              store.commit('setToken',res.data.token);
              store.commit('setUserInfo', res.data.userInfo);
              router.push({name: 'Home'})
              console.log(loginForm)
            } 
          }).catch(err => {
            console.log(err);
          })
        }
      });
    };

    //重置 函数
    const resetForm = () => {
      ruleForm.value.resetFields();
    };

    return {  
      loginForm,
      ruleLogin,
      ruleForm,
      submitForm,
      resetForm
    };
  },
});
</script>

<style scoped>
.login-bg {
  background: url('../../assets/login.jpg') no-repeat center;
  height: 100vh;
}
.login {
  position: fixed;
  left: 57%;
  top: 40%;
  width: 400px;
}
.el-form-item {
  margin-bottom: 35px;
}
button{
  margin-left: 36px;
  margin-right: 30px;
}
</style>

