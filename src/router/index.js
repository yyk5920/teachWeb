import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Layout from '@/layout'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/login',
    name: Login,
    component: () => import('@/views/login/index'),
    meta: { title: 'Login', icon: 'login' },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/mips',
    name: 'Example',
    meta: { title: '题库', icon: 'el-icon-s-help', roles: ['admin']},
    children: [
      {
        path: 'mips',
        name: 'Tree',
        component: () => import('@/views/addExercise/mips'),
        meta: { title: 'Mips', icon: 'tree' }
      },
      {
        path: 'verilog',
        name: 'Tree',
        // component: () => import('@/views/tree/verilog'),
        component: () => import('@/views/addExercise/mips'),
        meta: { title: 'Mips', icon: 'tree' }
      },
      {
        path: '题目列表',
        name: 'Tree',
        // component: () => import('@/views/tree/verilog'),
        component: () => import('@/views/add/addlist'),
        meta: { title: '题目列表', icon: 'tree' }
      },
      {
        path: '添加verilog题目',
        name: 'Tree',
        // component: () => import('@/views/tree/verilog'),
        component: () => import('@/views/add/addverilog'),
        meta: { title: '添加verilog题目', icon: 'tree' }
      },
    ]
  },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: '添加题目',
  //     icon: 'form',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Mips' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1/tab'),
  //           name: 'Menu1-1',
  //           meta: { title: '数据传送' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: '表达式' },
  //           // children: [
  //           //   {
  //           //     path: 'menu1-2-1',
  //           //     component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //           //     name: 'Menu1-2-1',
  //           //     meta: { title: 'Menu1-2-1' }
  //           //   },
  //           //   {
  //           //     path: 'menu1-2-2',
  //           //     component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //           //     name: 'Menu1-2-2',
  //           //     meta: { title: 'Menu1-2-2' }
  //           //   }
  //           // ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: '语言转换' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'Verilog' }
  //     }
  //   ]
  // },
  // {
  //   path: '/missioln_s',
  //   component: Layout,
  //   children: [{
  //     path: 'mission_s',
  //     name: 'Mission_s',
  //     component: () => import('@/views/mission_s/drag-kanban.vue'),
  //     meta: { title: '我的任务', icon: 'dashboard', roles: ['editor'] }
  //   }]
  // },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '管理', icon: 'form' , roles: ['']}
      }
    ]
  },
  // {
  //   path: '/homework',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'homework',
  //       name: 'Homework',
  //       meta: { title: '作业', icon: 'form',  roles: ['editor'] },
  //       component: ()=>import('@/views/homework')
  //     }
  //   ]
  // },
  {
    path: '/experiment',
    component: Layout,
    children: [
      {
        path: 'experiment',
        name: 'Experiment',
        meta: { title: '实验', icon: 'form',  roles: ['editor'] },
        component: ()=>import('@/views/experiment')

      }
    ]
  },
  // {
  //   path: '/test',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'Test',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: '考试', icon: 'form',  roles: ['editor'] }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router

