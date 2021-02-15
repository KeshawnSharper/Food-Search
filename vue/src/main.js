import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Login from "./components/Login";
import Register from "./components/Register";
import Recipe from "./components/Recipe";
import Home from "./components/Home";
import SavedRecipes from "./components/SavedRecipes";
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
    { path: '/', redirect: '/login' },
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
    ,
    { path: "/recipe/:id", name: 'recipe', component: Recipe,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem("token")){
next()
      }
      else{
        next(false)
      }
    } },
    { path: "/saved_recipes/:id", component: SavedRecipes, name: 'Saved Recipes',
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
      recipe: {},
      user_recipes: [],
      user_recipes_dict: {},
    },
    mutations: {
        
        GET_RECIPES(state, recipes) {
          state.recipes = recipes
        },
        GET_RECIPE(state, recipe) {
          state.recipe = recipe
        },
        ADD_RECIPE(state, recipe) {
          state.recipes.push(recipe)
          state.user_recipes_dict[recipe.id] = true
        },
        GET_USER_RECIPES(state, user_recipes) {

          state.user_recipes = user_recipes
          user_recipes.map(recipe => (
            state.user_recipes_dict[recipe.recipe_id] = true
          ))
console.log(state.user_recipes_dict)
        }
      },
         
           
            actions: {
                fetchRecipes({ commit }, recipe) {
                    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&maxFat=25&number=20&apiKey=e8bdd0a88cb74532a82c0427fb822da2&includeNutrition=true`)
                    .then(response => response.json())
                    .then(data => {
                        commit("GET_RECIPES", data.results);
                        });
                 
                },
                fetchRecipe({ commit }, id) {
                  fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&number=20&apiKey=e8bdd0a88cb74532a82c0427fb822da2&includeNutrition=true`)
                  .then(response => response.json())
                  .then(data => {
                      commit("GET_RECIPE", data);
                      });
               
              },
              fetchUserRecipes({ commit }) {
                fetch(`http://127.0.0.1:8000/saved_recipes/${localStorage.getItem('id')}`)
                .then(response => response.json())
                .then(data => {
                  
                    commit("GET_USER_RECIPES", data);
                    });
             
            },
            addRecipe({ commit }, recipe) {
              fetch(`http://127.0.0.1:8000/saved_recipes/post`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               "image": recipe.image,
               "name": recipe.title,
               "user_id":Number(localStorage.getItem('id')),
               "recipe_id":recipe.id
              }),
              })
              .then(response => response.json())
              .then(data => {
                
                  commit("ADD_RECIPE", data);
                  });
           
          }
              }
    
   
      
  })

new Vue({
  render: (h) => h(App),
  store,
  router
}).$mount("#app");
