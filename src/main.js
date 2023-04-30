import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { Message } from 'element-ui';
Vue.prototype.$message = Message;

Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
