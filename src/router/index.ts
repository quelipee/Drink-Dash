import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import getAPI from "../../services/getAPI";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/login',
    name: 'login',
    component: () => import('@/views/guest/LoginPage.vue'),
    beforeEnter:(to, from, next) =>{
      const isAuthenticated = localStorage.getItem('token');
      if (isAuthenticated){
        next('/tabs/tab1');
      }else {
        next()
      }
    }
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        name: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        beforeEnter: (to,from,next) => {
          const isAuthenticated = localStorage.getItem('token')
          if(!isAuthenticated){
            next('/login')
          }else {
            next()
          }
        }
      },
      {
        path: 'tab2',
        name: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        beforeEnter: (to,from,next) => {
          const isAuthenticated = localStorage.getItem('token')
          if(!isAuthenticated){
            next('/login')
          }else {
            next()
          }
        }
      },
      {
        path: 'tab3',
        name: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        beforeEnter: (to,from,next) => {
          const isAuthenticated = localStorage.getItem('token')
          if(!isAuthenticated){
            next('/login')
          }else {
            next()
          }
        }
      },
      {
        path: 'tab4',
        name: 'tab4',
        component: () => import('@/views/Tab4Page.vue'),
        beforeEnter: (to,from,next) => {
          const isAuthenticated = localStorage.getItem('token')
          if(!isAuthenticated){
            next('/login')
          }else {
            next()
          }
        }
      },
    ]
  },
  {
    path: '/drink/:id',
    name: 'drink',
    component: () => import('@/views/DrinkPage.vue'),
    props: true,
    beforeEnter: async (to, from, next) => {
      const isAuthenticated = localStorage.getItem('token');
      if (!isAuthenticated) {
        next('/login');
      } else {
        const product_id = to.params.id;
        const getProduct = await getAPI('product/' + product_id).then(response => {
          return response.stock.available_quantity;
        });

        if (getProduct === 0) {
          next({name:'tab1'})
        } else {
          next();
        }
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
