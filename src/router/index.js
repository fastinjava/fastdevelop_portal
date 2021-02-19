import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/module/backend/login/login.vue'
import BLOG_DETAIL from '@/module/portal/index/blog_detail.vue'
import ALBUM_DETAIL from '@/module/portal/index/album_detail.vue'
import QA from '@/module/portal/index/qa.vue'
import CHARPTER_DETAIL from '@/module/portal/index/charpter_detail.vue'
import Portal_Index from '@/module/portal/index/index.vue'
import SEARCH from '@/module/portal/index/search.vue'
import DEVELOP_TOOL from '@/module/portal/index/develop.vue'
import Backend_Index from '@/module/backend/index/index.vue'
import Backend_Index_Index from '@/module/backend/index/backend_index.vue'
import User_List from '@/module/backend/user/user_list.vue'
import PRJECT from '@/module/backend/project/prject.vue'
import EDIT from '@/module/backend/project/edit.vue'
import CATEGORY from '@/module/backend/category/category.vue'
import PROJECT_DETAIL from '@/module/backend/project/project_detail.vue'




Vue.use(Router)

export default new Router({
  scrollBehavior() {
    return {x: 0, y: 0};
  },
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/qa',
      name: 'QA',
      component: QA
    },{
      path: '/charpter_detail',
      name: 'CHARPTER_DETAIL',
      component: CHARPTER_DETAIL
    },
    {
      path: '/album_detail',
      name: 'ALBUM_DETAIL',
      component: ALBUM_DETAIL
    }, {
      path: '/search',
      name: 'SEARCH',
      component: SEARCH
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/develop_tool',
      name: 'DEVELOP_TOOL',
      component: DEVELOP_TOOL
    },{
      path: '/portal_index',
      name: 'Portal_Index',
      component: Portal_Index
    },{
      path: '/blog_detail',
      name: 'BLOG_DETAIL',
      component: BLOG_DETAIL
    },{
      path: '/backend_index',
      name: 'Backend_Index',
      component: Backend_Index,
      redirect:'/backend_index/backend_index_index',
      children:[
        {
          path: '/backend_index/backend_index_index',
          name: 'Backend_Index_Index',
          component: Backend_Index_Index
        }, {
          path: '/backend_index/user_list',
          name: 'User_List',
          component: User_List
        },{
          path: '/backend_index/project',
          name: 'PRJECT',
          component: PRJECT
        },{
          path: '/backend_index/category',
          name: 'CATEGORY',
          component: CATEGORY
        },{
          path: '/backend_index/edit',
          name: 'EDIT',
          component: EDIT
        },{
          path: '/backend_index/project_detail',
          name: 'PROJECT_DETAIL',
          component: PROJECT_DETAIL
        },

      ]
    },
  ]
})
