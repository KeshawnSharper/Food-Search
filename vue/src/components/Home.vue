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
export default{
  data: () => ({
    username: '',
    password: '',
  }),
     mounted() {
    this.recipes = this.$store.state.recipes;

  },
  methods: {

    getIngredients: function () {
        
      this.$store.commit("getIngredients");
      this.recipes = this.$store.state.recipes.value
    },
  },
}
</script>


<style>

</style>
