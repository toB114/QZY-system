import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from '@/plugins/axiosinstance.js'
/*导入element-plus*/
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
/*导入element-plus的图标*/
import * as ElIcons from '@element-plus/icons-vue'
//中文国际化
//import zhCn from 'element-plus/es/locale/lang/zh-cn'
//导入状态对象
import store from './store/index.js'

const app = createApp(App);
/*将element-plus的icons注册到app中*/
for(const name in ElIcons){
 app.component(name,ElIcons[name]);
}  
//app.use(ElementPlus,{locale:zhCn});  
app.use(router);
//在app应用中添加状态对象
app.use(store);
app.mount('#app');
app.config.globalProperties.$axios=axios;