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
    { path: "/login", component: Login, name: 'login' },
    { path: "/register", component: Register, name: 'register' },
    { path: "/home", component: Home, name: 'home' },
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
        getIngredients (state) {
            fetch('https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=20&apiKey=e8bdd0a88cb74532a82c0427fb822da2&includeNutrition=true', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then(response => response.json())
              .then((data) => {
                state.recipes.value = data.results
              })
              .catch((error) => {
                console.error('Error:', error);
              })
      }
    }
  })

new Vue({
  render: (h) => h(App),
  store,
  router
}).$mount("#app");
