import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RedCulture from '../views/RedCulture.vue'
import GreenIndustry from '../views/GreenIndustry.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '枫香溪首页' }
  },
  {
    path: '/red-culture',
    name: 'RedCulture',
    component: RedCulture,
    meta: { title: '红色文化' }
  },
  {
    path: '/green-industry',
    name: 'GreenIndustry',
    component: GreenIndustry,
    meta: { title: '绿色产业' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于枫香溪' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.afterEach((to) => {
  document.title = `${to.meta.title} - 枫香溪数智乡村官网`
})

export default router