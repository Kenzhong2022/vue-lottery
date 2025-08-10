import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

// 修改为只引入需要的组件
import { Button, Message } from 'element-ui' // 注意：MessageBox 实际对应 Message 组件

// 按需注册
Vue.use(Button)
Vue.prototype.$message = Message // 统一使用this.$message

// Vue.component(Button.name, Button)

Vue.config.productionTip = false
Vue.component('v-icon', Icon)

new Vue({
  render: h => h(App)
}).$mount('#app')
