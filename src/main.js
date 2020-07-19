import Vue from 'vue/dist/vue.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import index from './index.vue'
import book from './book.vue'
import chapter from './chapter.vue'
import VueLazyload from 'vue-lazyload'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(VueLazyload, {  
  preLoad: 1.3,   //预加载的宽高比
  error: '/static/error.jpg',//图片加载失败时使用的图片源
  loading: '/static/loading.gif',//图片加载的路径
  attempt: 3//尝试加载次数
})
Vue.use(VueRouter)
Vue.use(VueAxios,axios)
Vue.use(ElementUI)

const routes = [
  {	path: '/index', component: index,meta:{title:"韩漫"}},
  { path: '/book', component: book ,meta:{title:"韩漫"}},
  { path: '/chapter', component: chapter ,meta:{title:"韩漫"}},
  { path: '/', redirect: '/index' }
]
const router = new VueRouter({
	mode:"history",
  routes // (缩写) 相当于 routes: routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
