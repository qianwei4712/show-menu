import { createApp } from 'vue'
import TDesign from 'tdesign-mobile-vue';
import App from './App.vue'

// 引入组件库的少量全局样式变量
import 'tdesign-mobile-vue/es/style/index.css';

createApp(App)
    .use(TDesign)
    .mount('#app')
