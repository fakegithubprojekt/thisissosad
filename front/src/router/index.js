import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {Auth} from '@/services'
import store from '@/store'
import $router from '@/router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: 'posts/:id',
        props: true,
            name: 'post-detail',
        component: () => import('../views/detalji.vue')
      },
      {
        path: '/ulogiranioglasi',
        name: 'ulogiranioglasi',
        component: () => import(/* webpackChunkName: "post-detail" */'../views/ulogiranioglasi.vue')
      },
      {
        path: 'post/:id',
        props: true,
            name: 'post-detail1',
        component: () => import('../views/detalji1.vue')
      },
      {
        path: '/oglasiposlpocetna',
        name: 'oglasiposlpocetna',
        component: () => import('../views/oglasiposlpocetna.vue')
      }
    ]
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/postavioglas',
    name: 'postavioglas',
    component: () => import('../views/postavioglas.vue')
  },
  {
    path: '/pregledoglasa',
    name: 'pregledoglasa',
    component: () => import('../views/pregledoglasa.vue')
  },
  {
    path: '/oglasiposlodavac',
    name: 'oglasiposlodavac',
    component: () => import('../views/oglasiposlodavac.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/profil.vue')
  },
  /*{
    path: '/promjenalozinke',
    name: 'promjenalozinke',
    component: () => import('../views/promjenalozinke.vue')
  },*/
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/prijave',
    name: 'prijave',
    component: () => import('../views/prijave.vue')
  },
  {
    path: '/prijaveoglasivac',
    name: 'prijaveoglasivac',
    component: () => import('../views/prijaveoglasivac.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to,from,next)=>{
//   const javneStranice=["/login","/signup","/pregledoglasa"]
//   const loginPotreban=!javneStranice.includes(to.path)
//   const user=Auth.getUser()
//   if(loginPotreban && !user){
//     return next('/login')
//   }
//   next()
//   // else if(store.tipKorisnika=='Korisnik'){
//   //   this.$router.push({name: 'ulogiranioglasi'})
//   // }
// })
router.beforeEach((to,from,next)=>{
  const javneStranice=["/login","/signup","/pregledoglasa"]
  const loginPotreban=!javneStranice.includes(to.path)
  const user=Auth.getUser()
  if(!loginPotreban && user && store.tipKorisnika=='Korisnik'){
    return next('/ulogiranioglasi')
  }
  if(!loginPotreban && user && Auth.tipKorisnika=='admin'){
    return next('/admin')
  }
  next()
  // else if(store.tipKorisnika=='Korisnik'){
  //   this.$router.push({name: 'ulogiranioglasi'})
  // }
})
export default router
