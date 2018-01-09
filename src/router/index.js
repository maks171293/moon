import Vue from 'vue';
import Router from 'vue-router';
import Cookie from 'vue-cookie';
import Layout from '@/components/Layout';
import Home from '@/components/Home';
import LogIn from '@/components/LogIn';
import FixedLayout from '@/components/FixedLayout';
import CompanyList from '@/components/company/List';
import CompanyCreate from '@/components/company/Create';
import CompanyEdit from '@/components/company/Edit';
import CatalogList from '@/components/catalog/List';
import CatalogSingle from '@/components/catalog/Single';
import Page404 from '@/components/404';
import auth from '@/auth/index';

Vue.use(Router);

const lang = Cookie.get('lang') || 'en';

export default new Router({
  routes: [
    {
      path: '/',
      redirect: `/${lang}`,
    },
    {
      path: '/log-in',
      name: 'logIn',
      component: LogIn,
      // If logged in, redirect
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next({ name: 'home' });
        } else {
          next();
        }
      },
    },
    {
      path: '/log-out',
      name: 'logOut',
      // Log out and redirect
      beforeEnter: (to, from, next) => {
        auth.logout();
        console.log('test');
        next({ name: 'logIn' });
      },
    },
    {
      path: '/:lang',
      component: Layout,
      // If not logged in, redirect
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next();
        } else {
          next({ name: 'logIn' });
        }
      },
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'company',
          component: FixedLayout,
          children: [
            {
              path: '',
              redirect: { name: 'companyList' },
            },
            {
              path: 'list',
              name: 'companyList',
              component: CompanyList,
            },
            {
              path: 'create',
              name: 'companyCreate',
              component: CompanyCreate,
            },
            {
              path: ':id/edit',
              name: 'companyEdit',
              component: CompanyEdit,
            },
          ],
        },
        {
          path: 'catalog',
          component: FixedLayout,
          children: [
            {
              path: '',
              redirect: { name: 'catalogList' },
            },
            {
              path: 'list',
              component: CatalogList,
              name: 'catalogList',
            },
            {
              path: 'create',
              component: CatalogSingle,
              name: 'catalogCreate',
            },
          ],
        },
      ],
    },
    {
      path: '*',
      component: Page404,
    },
  ],
  mode: 'history',
});
