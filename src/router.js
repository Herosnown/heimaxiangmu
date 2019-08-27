import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import login from './components/login'
import home from './components/home'
import refrence from './components/home/main/refrence'
import content from './components/home/main/p_content.vue'
import comment from './components/home/main/p_comment'
import metiral from './components/home/main/matiral'
import article from './components/home/main/p_article'
import acount from './components/home/acount'
Vue.use(ElementUI)

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: login,
    meta: {
      title: '登录页'
    }

  },
  {
    path: '/',
    redirect: 'login'
  }, {
    path: '/home',
    component: home,
    meta: {
      title: '首页'
    },
    children: [{
      path: '/',
      component: refrence,
      meta: {
        title: '首页'
      }
    },
    {
      path: 'refrence',
      component: refrence,
      meta: {
        title: '首页'
      }
    },
    {
      path: 'accont',
      component: acount

    },
    {
      path: 'content/2-1',
      component: article,
      meta: {
        title: '发表文章'
      }

    },
    {
      path: 'content/2-2',
      component: content,
      meta: {
        title: '内容页面'
      }

    }, {
      path: 'content/2-3',
      component: comment,
      meta: {
        title: '评论列表'
      }

    }, {
      path: 'content/2-4',
      component: metiral,
      meta: {
        title: '素材列表'
      }
    }

    ]

  }

  ]
})
