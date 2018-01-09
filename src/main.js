// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Resource from 'vue-resource';
import Cookie from 'vue-cookie';
import Lang from 'vuejs-localization';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import router from './router';
import Header from './components/Header';
import Item from './components/catalog/Item';

Vue.config.productionTip = false;

// Vue resource
Vue.use(Resource);
Vue.http.options.root = process.env.NODE_ENV === 'production' ? '/sunbackend' : 'https://qasun.onmapos.com/sunbackend';

// Vue cookie
Vue.use(Cookie);

// Vue localization
Lang.requireAll(require.context('./lang', true, /\.js$/));
Vue.use(Lang);

// Register global components
Vue.component('app-header', Header);
Vue.component('item', Item);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
