// services/api.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getCocktails(ingredient) {
  return apiClient.get('filter.php?i='+ingredient)
}


export function getDrink(id){
    return apiClient.get('lookup.php?i='+id)
}

export function loadInderdients(){
    return apiClient.get('list.php?i=list')
}
// You can add more API functions here later
// export function getPosts() { return apiClient.get('/posts') }
