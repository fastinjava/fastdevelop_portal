// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



/*element ui*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(ElementUI);


/*vue markdown editor*/

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

VueMarkdownEditor.use(vuepressTheme);
Vue.use(VueMarkdownEditor);

//
// import VueMarkdownEditor from '@kangc/v-md-editor';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import createHljsTheme from '@kangc/v-md-editor/lib/theme/hljs';
// // 按需引入 highlightjs 的语言包，此处以 json 为例
// import java from 'highlight.js/lib/languages/java';
// import xml from 'highlight.js/lib/languages/xml';
// import json from 'highlight.js/lib/languages/json';
// import yaml from 'highlight.js/lib/languages/yaml';
//
// const hljsTheme = createHljsTheme();
// hljsTheme.extend((md, hljs) => {
//   // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
//   // md.set(option).use(plugin);
//
//   // 注册语言包
//   hljs.registerLanguage('java', java);
//   hljs.registerLanguage('xml', xml);
//   hljs.registerLanguage('json', json);
//   hljs.registerLanguage('yaml', yaml);
// });
// VueMarkdownEditor.theme(hljsTheme);
// Vue.use(VueMarkdownEditor);



/*vue-splitpane*/

import splitPane from 'vue-splitpane'

Vue.component('split-pane', splitPane);



/*moment.js 时间工具*/
import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn');
Vue.prototype.$moment = moment;//赋值使用


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 让页面回到顶部
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;
  // safari
  window.pageYOffset = 0;
  // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
