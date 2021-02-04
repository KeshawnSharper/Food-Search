<template>
<div>
<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?"  v-model="recipe">
      <button v-on:click="search" type="submit" class="searchButton">
        <i class="fa fa-search"></i>
     </button>
   </div>
</div>
  <ol v-if="this.recipes">
    <li v-for="recipe in this.recipes" :key="recipe.id">
      {{ recipe.title }}
    </li>
  </ol>
  <button v-on:click="search"> </button>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default{
  data: () => ({
    username: '',
    password: '',
    recipe: '',
  }),
     mounted() {
         this.$store.dispatch("fetchRecipes")


  },
  computed:mapState(["recipes"]),
  methods: {
    search: function () {
    console.log(this.recipe)
    }
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
</style>
