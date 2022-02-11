import gql from "graphql-tag";
import { createRouter, createWebHistory } from 'vue-router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import LogIn from "./components/LogIn.vue"
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Contact from './components/Contact.vue'
import Favorite from './components/Favorite.vue'
import Category from './components/Category.vue'
import Product from './components/Product.vue'

const routes = [
   {
      path: '/',
      name: "logIn",
      component: LogIn,
      meta: { requiresAuth: false }
   },
   {
      path: '/user/signUp',
      name: "signUp",
      component: SignUp,
      meta: { requiresAuth: false }
   },
   {
      path: '/user/home',
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
   },
   {
      path: '/user/contact',
      name: "contact",
      component: Contact,
      meta: { requiresAuth: true }
   },
   {
      path: '/user/favorite',
      name: "favorite",
      component: Favorite,
      meta: { requiresAuth: true }
   },
   {
      path: '/user/home/category',
      name: "category",
      component: Category,
      meta: { requiresAuth: true }
   },
   {
      path: '/user/home/product',
      name: "product",
      component: Product,
      meta: { requiresAuth: true }
   }]

const router = createRouter({
   history: createWebHistory(),
   routes,
});

const apolloClient = new ApolloClient({
   link: createHttpLink({ uri: 'https://mintic-c4-proj-apigateway.herokuapp.com/'}),
   cache: new InMemoryCache()
})

async function isAuth() {
   if (localStorage.getItem("tokenAccess") === null || 
         localStorage.getItem("tokenRefresh") === null) {
            return false;
   }

   try {
      var result = await apolloClient.mutate({
         mutation: gql`
            mutation RefreshToken($refresh: String!) {
               refreshToken(refresh: $refresh) {
                  access
               }
            }
            `,
            variables: {
               refresh: localStorage.getItem("tokenRefresh"),
            },
      })

      localStorage.setItem("tokenAccess", result.data.refreshToken.access);
      return true;
   } catch {
      localStorage.clear();
      alert("Su sesión expiró, por favor vuelva a iniciar sesión");
      return false;
   }
}

router.beforeEach(async(to, from) => {
   var is_auth = await isAuth();

   if (is_auth == to.meta.requiresAuth) return true
   if (is_auth) return { name: "home" };
   return { name: "logIn" };
})

export default router;