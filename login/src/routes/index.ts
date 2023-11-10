
import { createRouter, createWebHistory} from 'vue-router';
import Login from '../views/LoginView.vue'
import Home from '../views/HomeView.vue'
import { useAuthStore } from '../components/auth';

const routes = [
    {
        path:'/',
        name:'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
    path:'/login',
    name:'Login',
    component: Login
    },
    {
        path : '/:catchAll(.*)',
        redirect:'/'
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login'); 
    } else {
      next(); 
    }
  });

export default router;