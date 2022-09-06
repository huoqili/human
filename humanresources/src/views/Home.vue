<template>
  <el-container class="home">
    <el-aside width="200px" style="backgroundColor: rgb(67, 74, 80);border: none">
      <h1>人事管理系统</h1>
     <el-menu
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
     <el-sub-menu index="2">
      <template #title>招聘管理</template>
      <el-menu-item index="/recruitinsert">招聘需求</el-menu-item>
      <el-menu-item index="/auditioninsert">面试流程</el-menu-item>
      <el-menu-item index="/audition">招聘面试统计</el-menu-item>
      <el-menu-item index="/recruit">招聘需求报表</el-menu-item>
    </el-sub-menu>
    
    <el-sub-menu index="18">
      <template #title>调岗管理</template>
      <el-menu-item index="/posttransferinsert">调岗申请</el-menu-item>
      <el-menu-item index="/posttransferindex">调岗记录</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="20">
      <template #title>入职管理</template>
      <el-menu-item index="/inductioninsert">入职审批</el-menu-item>
      <el-menu-item index="/inductionindex">入职登记档案库</el-menu-item>
    </el-sub-menu>
      <el-sub-menu index="7">
      <template #title>转正管理</template>
      <el-menu-item index="/regularizationinsert">转正添加</el-menu-item>
      <el-menu-item index="/regularizationquery">转正查看</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="8">
      <template #title>合同管理</template>
      <el-menu-item index="/contractinsert">合同添加</el-menu-item>
      <el-menu-item index="/contractquery">合同查看</el-menu-item>
    </el-sub-menu>
     <el-sub-menu index="9">
      <template #title>考勤管理</template>
      <el-menu-item index="/leaveinsert">请假申请</el-menu-item>
      <el-menu-item index="/leaveindex">请假申请审核</el-menu-item>
      <el-menu-item index="/businesstravelinsert">出差申请</el-menu-item>
      <el-menu-item index="/businessTravelIndex">出差申请审核</el-menu-item>
    </el-sub-menu>
      <el-sub-menu index="5">
      <template #title>离职管理</template>
      <el-menu-item index="/quitinsert">离职申请</el-menu-item>
      <el-menu-item index="/quitindex">离职申请记录</el-menu-item>
      <el-menu-item index="/handoverinsert">离职交接</el-menu-item>
      <el-menu-item index="/handoverindex">离职交接记录</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>薪资管理</template>
       <el-menu-item index="/salayinsert">薪资表</el-menu-item>
      <el-menu-item index="/salay">薪资发放记录</el-menu-item>
      <el-menu-item index="/salayfeedback">薪资问题反馈</el-menu-item>
       <el-menu-item index="/salayfeed-query">薪资反馈查询</el-menu-item>
      <el-menu-item index="/salaycensus">薪资成本统计</el-menu-item>
    </el-sub-menu>
  </el-menu>
    </el-aside>
    <el-container>
      <el-header style="backgroundColor: rgb(67, 74, 80);padding: 0;float:left">
          <el-menu
          :default-active="activeIndex2"
          class="el-menu-header"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
           :router="true"

        >
            <el-sub-menu index="2">
            <template #title>部门管理</template>
            <el-menu-item index="/departmentinsert">部门添加</el-menu-item>
            <el-menu-item index="/department">部门查看</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>员工档案</template>
            <el-menu-item index="/staffinsert">人员信息档案</el-menu-item>
            <el-menu-item index="/staffquery">人员信息查看</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="12" class="editlogin">
            <template #title>用户管理</template>
            <el-menu-item @click="handlerLogout" index="/setPassword">修改密码</el-menu-item>
            <el-menu-item @click="handlerLogout" index="/login">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-main>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
      <el-footer class="footer"><div class="Foot">欢迎来到人事管理系统平台</div></el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    const route = useRoute();
    let username = computed(() => {
      let userInfo = store.state.userInfo;
      return userInfo.username;
    })

    let handlerLogout = () => {
      store.commit('setToken', '');
      sessionStorage.clear();
    }

    return {
      username,
      route,
      handlerLogout
    }
  }
});
</script>

<style scoped>
    .home {
      width: 100vw;
      height: 100vh;
    }
    .el-menu-demo {
      width: 200px;
      border:none;
    }
    .home h1 {
      height: 60px;
      line-height: 60px;
      color: #fff;
      font-size: 24px;
      text-align: center;
      text-shadow: 0 0 3px #333;
    }
    .el-menu .el-menu-demo{
      background-color: #434a50;
    }
    .el-breadcrumb {
      margin-bottom: 30px;
      font-size: 16px;
    }
    .editlogin {
      position: fixed;
      right: 50px;
    }
</style> 
  
