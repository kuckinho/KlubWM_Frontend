import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ClubsView from '../views/ClubsView.vue'
import StadiumsView from '../views/StadiumsView.vue'
import TimerView from '../views/TimerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/clubs',
      name: 'clubs',
      component: ClubsView,
    },
    {
      path: '/stadiums',
      name: 'stadiums',
      component: StadiumsView,
    },
    {
      path: '/timer',
      name: 'timer',
      component: TimerView,
    },
  ],
})

export default router
