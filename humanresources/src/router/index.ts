import store from '@/store'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/practice',
    name: 'practice',
    component: () => import('../views/staff/practice.vue'),
    meta: {
      title: '练习'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '易达人事管理系统'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '易达人事管理系统',
      auth: true
    },
    redirect: '/audition',
    children: [
      {
        path: 'department',
        name: 'department',
        component: () => import('../views/department/index.vue'),
        meta: {
          title: '部门查看',
          auth: true
        }
      },
      {
        path: 'departmentinsert',
        name: 'departmentinsert',
        component: () => import('@/views/department/insert.vue'),
        meta: {
          title: '部门添加',
          auth: true
        }
      },
      {
        path: 'departmentedit',
        name: 'departmentedit',
        component: () => import('@/views/department/edit.vue'),
        meta: {
          title: '部门编辑',
          auth: true
        }
      },
      {
        path: 'staffinsert',
        name: 'staffinsert',
        component: () => import('@/views/staff/insert.vue'),
        meta: {
          title: '人员信息档案',
          auth: true
        }
      },
      {
        path: 'staffquery',
        name: 'staffquery',
        component: () => import('@/views/staff/index.vue'),
        meta: {
          title: '人员信息查看',
          auth: true
        }
      },
      {
        path: 'staffedit',
        name: 'staffedit',
        component: () => import('@/views/staff/edit.vue'),
        meta: {
          title: '人员信息编辑',
          auth: true
        }
      },
      {
        path: 'salay',
        name: 'salay',
        component:() => import('../views/salay/index.vue'),
        meta: { title:'薪资发放记录',auth: true }
      },
      {
        path: 'salayinsert',
        name: 'salayinsert',
        component:() => import('../views/salay/insert.vue'),
        meta: { title:'薪资表',auth: true }
      },
      {
        path: 'salayedit',
        name: 'salayedit',
        component:() => import('../views/salay/edit.vue'),
        meta: { title:'薪资编辑',auth: true }
      },
      {
        path: 'salayread',
        name: 'salayread',
        component:() => import('../views/salay/read.vue'),
        meta: { title:'薪资查看',auth: true }
      },
      {
        path: 'salaycensus',
        name: 'salaycensus',
        component:() => import('../views/salay/census.vue'),
        meta: { title:'薪资成本统计',auth: true }
      },
      {
        path: 'salayfeedback',
        name: 'salayfeedback',
        component:() => import('../views/salay/feedback.vue'),
        meta: { title:'薪资问题反馈',auth: true }
      },
      {
        path: 'salayfeed-query',
        name: 'salayfeedquery',
        component:() => import('../views/salay/feedquery.vue'),
        meta: { title: '薪资反馈查询',auth: true }
      },
      {
        path: 'recruit',
        name: 'recruit',
        component:() => import('../views/recruit/index.vue'),
        meta: { title: '招聘需求报表',auth: true }
      },
      {
        path: 'recruitinsert',
        name: 'recruitinsert',
        component:() => import('../views/recruit/insert.vue'),
        meta: { title: '招聘需求',auth: true }
      },
      {
        path: 'recruitedit',
        name: 'recruitedit',
        component:() => import('../views/recruit/edit.vue'),
        meta: { title: '招聘信息修改',auth: true }
      },
      {
        path: 'audition',
        name: 'audition',
        component:() => import('../views/audition/index.vue'),
        meta: { title: '招聘面试统计', auth: true}
      },
      {
        path: 'auditioninsert',
        name: 'auditioninsert',
        component:() => import('../views/audition/insert.vue'),
        meta: { title: '面试流程', auth: true}
      },
      {
        path: 'auditionedit',
        name: 'auditionedit',
        component: () => import('../views/audition/edit.vue'),
        meta: {title: '面试记录', auth: true}
      },
      {
        path: 'posttransferinsert',
        name: 'posttransferinsert',
        component: () => import('@/views/posttransfer/Insert.vue'),
        meta: {
          title: '调岗申请',
          auth: true
        }
      },
      {
        path: 'posttransferindex',
        name: 'posttransferindex',
        component: () => import('@/views/posttransfer/Index.vue'),
        meta: {
          title: '调岗记录',
          auth: true
        }
      },
      {
        path: 'posttransferedit',
        name: 'posttransferedit',
        component: () => import('@/views/posttransfer/Edit.vue'),
        meta: {
          title: '编辑调岗记录',
          auth: true
        }
      },
      // 入职管理
      {
        path: 'inductioninsert',
        name: 'inductioninsert',
        component: () => import('@/views/induction/Insert.vue'),
        meta: {
          title: '入职审批',
          auth: true
        }
      },
      {
        path: 'inductionindex',
        name: 'inductionindex',
        component: () => import('@/views/induction/Index.vue'),
        meta: {
          title: '入职登记档案库',
          auth: true
        }
      },
      {
        path: 'inductionedit',
        name: 'inductionedit',
        component: () => import('@/views/induction/Edit.vue'),
        meta: {
          title: '入职登记档案库',
          auth: true
        }
      },
      {
        path: 'quitinsert',
        name: 'quitinsert',
        component: () => import('@/views/quit/insert.vue'),
        meta: {
          title: '离职申请',
          auth: true
        }
      },
      {
        path: 'quitindex',
        name: 'quitindex',
        component: () => import('@/views/quit/index.vue'),
        meta: {
          title: '离职申请查看',
          auth: true
        }
      },
      {
        path: 'quitedit',
        name: 'quitedit',
        component: () => import('@/views/quit/edit.vue'),
        meta: {
          title: '离职申请编辑',
          auth: true
        }
      },
      {
        path: 'handoverinsert',
        name: 'handoverinsert',
        component: () => import('@/views/handover/insert.vue'),
        meta: {
          title: '离职交接',
          auth: true
        }
      },
      {
        path: 'handoverindex',
        name: 'handoverindex',
        component: () => import('@/views/handover/index.vue'),
        meta: {
          title: '离职交接查看',
          auth: true
        }
      },
      {
        path: 'handoveredit',
        name: 'handoveredit',
        component: () => import('@/views/handover/edit.vue'),
        meta: {
          title: '离职交接编辑',
          auth: true
        }
      },
      {
        path: 'regularizationinsert',
        name: 'regularizationinsert',
        component: () => import('@/views/regularization/insert.vue'),
        meta: {
          title: '转正添加',
          auth: true
        }
      },
      {
        path: 'regularizationquery',
        name: 'regularizationquery',
        component: () => import('@/views/regularization/index.vue'),
        meta: {
          title: '转正查看',
          auth: true
        }
      },
      {
        path: 'regularizationedit',
        name: 'regularizationedit',
        component: () => import('@/views/regularization/edit.vue'),
        meta: {
          title: '转正信息编辑',
          auth: true
        }
      },
      {
        path: 'contractinsert',
        name: 'contractinsert',
        component: () => import('@/views/contract/insert.vue'),
        meta: {
          title: '合同添加',
          auth: true
        }
      },
      {
        path: 'contractquery',
        name: 'contractquery',
        component: () => import('@/views/contract/index.vue'),
        meta: {
          title: '合同查看',
          auth: true
        }
      },
      {
        path: 'contractedit',
        name: 'contractedit',
        component: () => import('@/views/contract/edit.vue'),
        meta: {
          title: '合同信息编辑',
          auth: true
        }
      },
{
        path:"businesstravelinsert",
        name:"BusinessTravelInsert",
        component:() => import('@/views/attendance/BusinessTravelInsert.vue'),
        meta:{
          title:'出差申请',
          auth:true
        }
      },
      {
        path:"businessTravelIndex",
        name:"BusinessTravelIndex",
        component:() => import('@/views/attendance/BusinessTravelIndex.vue'),
        meta:{
          title:'出差申请查看',
          auth:true
        }
      },
      {
        path:"businesstraveledit",
        name:"BusinessTravelEdit",
        component:() => import('@/views/attendance/BusinessTravelEdit.vue'),
        meta:{
          title:'出差申请编辑',
          auth:true
        }
      },
      {
        path:"fieldpersonnelinsert",
        name:"FieldPersonnelInsert",
        component:() => import('@/views/attendance/FieldPersonnelInsert.vue'),
        meta:{
          title:'外勤打卡',
          auth:true
        }
      },
      {
        path:"leaveinsert",
        name:"LeaveInsert",
        component:() => import('@/views/attendance/LeaveInsert.vue'),
        meta:{
          title:'请假申请',
          auth:true
        }
      },
      {
        path:"leaveindex",
        name:"LeaveIndex",
        component:() => import('@/views/attendance/LeaveIndex.vue'),
        meta:{
          title:'请假申请查看',
          auth:true
        }
      },
      {
        path:"leaveedit",
        name:"LeaveEdit",
        component:() => import('@/views/attendance/LeaveEdit.vue'),
        meta:{
          title:'请假申请编辑',
          auth:true
        }
      },
      {
        path:"workovertimeinsert",
        name:"WorkOvertimeInsert",
        component:() => import('@/views/attendance/WorkOvertimeInsert.vue'),
        meta:{
          title:'加班申请',
          auth:true
        }
      },
      {
        path:"statisticsindex",
        name:"StatisticsIndex",
        component:() => import('@/views/attendance/StatisticsIndex.vue'),
        meta:{
          title:'考勤统计',
          auth:true
        }
      }
    ]
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next) => {
  const meta = to.meta;
  const {title,auth} = meta;
  document.title = title as string;
  const token = store.state.token;
  if(auth) {
    if(token) {
      next();
    }else{
      next({name: 'login'});
    }
  }else {
    next();
  }
})

export default router
