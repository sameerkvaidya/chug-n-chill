<template>
  <div>

    <i-page-shell :horizontal-nav-items="[
    {
      href: '#',
      label: 'Home',
      active: true
    },
    {
      href: '#/about',
      label: 'About'
    },
    
    ]">
     <template #app-header>
        <i-app-header title="Chug and Chill" />
     </template>
    

     <i-long-form-text>
        <h1>App Designed to help you pick your poison</h1>
      
        <p> Select the Main Ingredient and app will show you drinks that can be made using it.</p>
     </i-long-form-text>

     <i-select :options=options   v-model="ingredient" @update:modelValue="findCocktails" />

     <i-data-table :table-data="cocktails_table" />

      <i-modal :header="receipeHeader" ref="modal" :body="receipeModalBody" :is-open="showSuccessModal"
          primary-button-label="Okay"
          @on-primary-button-click="toggleModal">
      <cocktail-details :drink=drink />

      </i-modal>    

    </i-page-shell>
  </div>
</template>
<script>

import Greeter from './components/Greeter.vue';
import Cocktail from './components/Cocktail.vue';
import CocktailDetails from './components/CocktailDetails.vue';
import { getCocktails, getDrink, loadInderdients} from './services/api.js';
import { IAppFooter, ISelect, IPageShell, IAppHeader, ILongFormText, IDataTable, IModal} from 'indigo-component-library';


export default {
  

  data(){
    return {
      receipeModalBody:'',
      receipeHeader:'',
      thumbnailUrl:'',
      showSuccessModal: false,
      cocktails: [{strDrink: 'lolo'}],
      drink: {},
      options: [],
      ingredient: '',
      cocktails_table: {head: [{label: 'Drink Name', static:true}, {label: 'Image', static: true},{label: 'ID', static: true}, {label:'Action', static: true}], }
    }
  },

  props:{
  },

  components:{
    Greeter,
    Cocktail,
    CocktailDetails,
    IAppFooter,
    ISelect,
    IPageShell,
    IAppHeader,
    ILongFormText,
    IDataTable,
    IModal
  },

  created(){
    this.loadOptions();
  },

  methods: {
    async loadOptions(){
      try{
        const response = await loadInderdients()
        const ingredients = response.data.drinks

        this.options = ingredients.map(item => {
          const name = item.strIngredient1
          return {
            label: name,
            value: name
          }
        })
      }catch(error){
        console.log('Error loading options for ingrdients', error);
      }
    },

    /**
     * find all cocktails that has this ingrdient
    */
    async findCocktails() {
      try {
        const response = await getCocktails(this.ingredient)
        this.cocktails = response.data.drinks
        this.cocktails_table.body = this.maskResponse(this.cocktails);
      } catch (error) {
        console.error('Error loading cocktails:', error)
      }
    },

    /**
     * find receipe for this drink by id
     */
    async getDrinkDetails(id) {
      try {
        const response = await getDrink(id)
        this.drink = response.data.drinks[0];
        console.log(JSON.stringify(this.drink));
        
      } catch (error) {
        console.error('Error loading cocktail details:', error)
      }
    },

    openModal(id){
      this.getDrinkDetails(id);
      this.receipeModalBody = this.drink.strInstructions;
      this.receipeHeader = this.drink.strDrink;
      this.thumbnailUrl = this.drink.strDrinkThumb;
      this.$refs.modal.toggleOpen();
    },
    toggleModal: function () {
      this.$refs.modal.toggleOpen();
    },

    /**
     * add icon for opening up receipe for this drink
     */
    maskResponse(input) {
      input.forEach(element => {
          element.action = {
              icon: {
                  name: 'IconDownload',
                  ariaLabel: 'show-'+element.idDrink,
                  click: () => {
                      this.openModal(element.idDrink)
                  }
              }
          }
      });



      const result = input.map(e => [e.strDrink, e.strDrinkThumb, e.idDrink, e.action])

      return result;
    },



  }


}
</script>

<style>
.card {
  display: flex;
  align-items: center;
  gap: 10px;
}
.thumbnail {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
