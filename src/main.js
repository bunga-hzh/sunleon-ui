import 'babel-polyfill'
import 'classlist-polyfill'
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import axios from './router/axios'
import VueAxios from 'vue-axios'
import App from './App'
import './permission' // 权限
import './error' // 日志
import './cache' //页面缓冲
import router from './router/router'
import store from './store'
import {
  loadStyle,
  downBlobFile
} from './util/util'
import * as urls from '@/config/env'
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env'
import * as filters from './filters' // 全局filter
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/common.scss'
import AvueFormDesign from '@sscfaith/avue-form-design'
import basicContainer from './components/basic-container/main'
import AvueUeditor from 'avue-plugin-ueditor'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
Vue.prototype.downBlobFile = downBlobFile;

// 插件 json 展示
Vue.use(router)

Vue.use(AvueFormDesign);
Vue.use(AvueUeditor);

window.axios = axios
Vue.use(VueAxios, axios)

Vue.use(ElementUI, {
  size: 'small',
  menuType: 'text'
})

// Vue.filter('getUrl',function (value){
//   let fileName = value.substring(value.lastIndexOf("/"),value.length)+1;
//   getPreViewUrlAll(fileName).then(res=>{
//     return 'http://baidu.com'
//   });
//   // return 'http://localhost:8082'
// })

Vue.use(Avue, {
  size: 'small',
  menuType: 'text'
})

// 注册全局容器
Vue.component('basicContainer', basicContainer)

// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

// 加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

Vue.config.productionTip = false

Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
