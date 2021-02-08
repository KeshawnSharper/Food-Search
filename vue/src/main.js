import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Vuex from 'vuex'


Vue.use(VueRouter);
Vue.use(Vuex)

Vue.config.productionTip = false;

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '', redirect: '/login' },
    { path: "/login", component: Login, name: 'login'},
    { path: "/register", component: Register, name: 'register' },
    { path: "/home", component: Home, name: 'home',
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem("token")){
next()
      }
      else{
        next(false)
      }
    }
    }
  
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
});
const store = new Vuex.Store({
    state: {
      recipes: [],
      ingredients: [],
    },
    mutations: {
        
        GET_RECIPES(state, recipes) {
          state.recipes = recipes
        }
      },
         
           
            actions: {
                fetchRecipes({ commit }, recipe) {
                    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&maxFat=25&number=20&apiKey=e8bdd0a88cb74532a82c0427fb822da2&includeNutrition=true`)
                    .then(response => response.json())
                    .then(data => {
                        commit("GET_RECIPES", data.results);
                        console.log(data.results)});
                 
                }
              }
    
   
      
  })

new Vue({
  render: (h) => h(App),
  store,
  router
}).$mount("#app");
