<template>
<div>
<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" id="search" placeholder="What are you looking for?"  v-model="recipe">
      <button v-on:click="search" type="submit" class="searchButton">
        <i class="fa fa-search"></i>
     </button>
     <router-link :to="{ name: 'Saved Recipes',params: { id: id }}"><p class="saved_recipes">Saved Recipes</p></router-link>
   </div>
</div>
<div class="grid-container" v-if="this.recipes">
     <div v-for="recipe in this.recipes" :key="recipe.id" class="grid-item card">
            <div class="card__image">
               <img :src="recipe.image" alt="Salad" />
            </div>
            <div class="card__info">
               <div class="car__info--title">
                 <h3>{{ recipe.title }}</h3>
                  <router-link :to="{ name: 'recipe', params: { id: recipe.id }}"> See Recipe</router-link>
               </div>
               <div class="card__info--price">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
               </div>
         </div>
      
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default{
  data: () => ({
    username: '',
    password: '',
    recipe: '',
    id: localStorage.getItem('id')
  }),
     mounted() {
         this.$store.dispatch("fetchRecipes","Tuna")
         this.$store.dispatch("fetchUserRecipes")

  },
  computed:mapState(["recipes","user_recipes","user_recipes_dict","user_id"]),
  methods: {
    search: function () {
       console.log(this.user_recipes)
       console.log(this.recipes)
       console.log(this.user_recipes_dict)
this.$store.dispatch("fetchRecipes",this.recipe)    }
  }
  
 


}
</script>


<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 100%;
 display: flex;
 margin-top:2rem;
}

.searchTerm {
  width: 100%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #00B4CC;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap{
  width: 30%;
  margin-left:50%;
  margin-top:1.5%;
  transform: translate(-50%, -50%);
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
.grid-item {
  
}
.card {
   width: 295px;
   overflow: hidden;
   border-radius: 25px;
   border: 1px solid lavender;
   margin: 10px;
   box-shadow: 5px 5px 15px 5px rgba(230, 230, 250, 1);
}

.card__image {
   position: relative;
   height: 140px;
}
.card__image > img {
   max-width: 100%;
   border-bottom-right-radius: 30px;
   transform: rotate(10deg) translate(-15px, -55px);
   position: absolute;
   height: 200px;
   object-fit: cover;
   object-position: center;
}

.card__info {
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   padding: 0px 30px 20px 30px;
}
.card__info h3 {
   font-size: 18px;
   font-weight: 700;
}
.card__info p {
   font-size: 14px;
   font-weight: 600;
}
.card__info--price {
   text-align: right;
   color: orangered;
}
.rect2 {
   position: relative;
   bottom: 315px;
   right: 15px;
   width: 325px;
   height: 230px;
   border: 1px solid lavender;
   border-radius: 0 0px 80px 0;
   transform: rotate(10deg);
   object-fit: cover;
}
.checked {
   color: #ffd700;
}

::-webkit-scrollbar {
   width: 8px;
}

::-webkit-scrollbar-thumb {
   background: #cccccc;
   border-radius: 10px;
}

::-webkit-scrollbar-track {
   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
   border-radius: 10px;
}
.pointer{
cursor:pointer
}
#search{
   height:2.3rem;
   
}
.saved_recipes{
margin-left:2rem;
}
@media only screen and (max-width: 600px) {

  .grid-container {
    margin-left:5rem;
    grid-template-columns: auto ;

  }
  #search{
   width:15rem;
}
}
@media only screen and (min-width: 600px) and (max-width: 992px) {
  .grid-container {
    grid-template-columns: auto auto auto;

  }
}
</style>
