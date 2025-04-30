<template>

  <div>

    <img :src="drink.strDrinkThumb" alt="Cocktail Image" class="thumbnail" />

    <h2>Glass Type:</h2>
    <p>{{ drink.strGlass }}</p>

    <h2>Instructions:</h2>
    {{drink.strInstructions}}


    <h2>Ingredients:</h2>
    <ul>
      <li v-if="drink.strIngredient1">{{ drink.strIngredient1 }}</li>
      <li v-if="drink.strIngredient2">{{ drink.strIngredient2 }}</li>
      <li v-if="drink.strIngredient3">{{ drink.strIngredient3 }}</li>
      <li v-if="drink.strIngredient4">{{ drink.strIngredient4 }}</li>
    </ul>
    
    
    
  </div>

</template>



<script>

import {IAccordion} from 'indigo-component-library';

export default {
    
    name: 'CocktailDetails',
    props:{
        drink: {}
    },
    components:{
        IAccordion
    }
}
</script>


<style scoped>
.cocktail-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  margin-top: 20px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}
</style>