import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/global.css'
import App from './App.vue'
import Home from './views/Home.vue'
import RedCulture from './views/RedCulture.vue'
import GreenIndustry from './views/GreenIndustry.vue'
import About from './views/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: '首页' } },
  { path: '/red-culture', name: 'RedCulture', component: RedCulture, meta: { title: '红色文旅' } },
  { path: '/green-industry', name: 'GreenIndustry', component: GreenIndustry, meta: { title: '绿色产业' } },
  { path: '/about', name: 'About', component: About, meta: { title: '关于本站' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.afterEach((to) => {
  document.title = '数智枫香溪网站'
})

const app = createApp(App)
app.use(router)
app.mount('#app')
