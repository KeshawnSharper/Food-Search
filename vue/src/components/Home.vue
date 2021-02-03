<template>
<div>

  <ol v-if="this.recipes">
    <li v-for="recipe in this.recipes" :key="recipe.id">
      {{ recipe.title }}
    </li>
  </ol>
  <button v-on:click="getIngredients"> </button>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default{
  data: () => ({
    username: '',
    password: '',
  }),
     mounted() {
         this.$store.dispatch("fetchRecipes")


  },
  computed:mapState(["recipes"])
  
 


}
</script>


<style>

</style>
