<template>
  <div>
    <NavBar/>

    <div class="lg:w-4/6 w-1/2 mx-auto p-8 w-full">
      <div class="flex gap-2 lg:flex-row flex-col justify-center">
        <div class="flex ">
          <input type="text" placeholder="Que recherchez-vous ?" class="flex-grow border-2 border-gray-500 outline-none py-2.5 px-5 rounded-l">
          <button class="py-2.5 px-5 bg-green-500 border-2 border-green-500 text-white font-semibold rounded-r"><i class="fas fa-search"></i></button>
        </div>

        <div class="flex">
          <select class="flex-grow py-2.5 px-5 border-2 border-gray-500 outline-none rounded">
            <optgroup v-for="(category,i) in sous_categories" :key="i" :label="category.category">
              <option v-for="(sousCategorie,y) in category.sub_category" :key="y">{{sousCategorie}}</option>
            </optgroup>
          </select>
        </div>

        <div class="flex">
          <input type="number" placeholder="Prix" class="flex-grow py-2.5 px-5 border-2 border-gray-500 outline-none rounded">
        </div>

      </div>

    </div>


    <div class="lg:w-1/2 w-full p-3  mx-auto lg:mt-12 mt-6">

        <div class="flex flex-col justify-around space-y-5" v-for="product in products" :key="product.id">
          <router-link :to="{name:'Product', params: { id:product.id }}" >
            <div class="flex border-2 border-gray-300 rounded ">
              <div class="w-1/3 self-center">
                <img v-if="product.images!==[]" class="object-cover max-w-full"  :src="product.images[0].url" :alt="product.title"/>
                <img v-else class="object-cover max-w-full"  src="../assets/default_image.jpg" :alt="product.title"/>
              </div>

              <div class="flex flex-col justify-between ml-2">
                <div>
                  <h1 class="font-semibold text-xl">{{product.title}}</h1>
                  <p class="font-semibold">{{product.price}} €</p>
                </div>

                <div>
                  <p>{{product.sub_category.name}}</p>
                  <p>{{product.date}}</p>
                </div>

              </div>
            </div>

          </router-link>

          <div class="border-solid border-b-2 border-gray-300"></div>
          <div></div>

        </div>



    </div>




  </div>
</template>

<script>

import axios from 'axios';
import NavBar from "../components/NavBar";
import {onMounted, ref} from "vue";


export default {
  name: 'Accueil',
  components: {NavBar },

  setup(){

    const categories=ref([]);
    const sous_categories=ref([]);
    const products=ref([]);
    const getItem=ref('');
    const items= ref(['mechant','gentil'])

    console.log(getItem.value)

    function theDate(param){

      const dateJour=new Date();

      const todayDate=dateJour.getDate()+"-"+(dateJour.getMonth()+1)+"-"+dateJour.getFullYear();

      const date=param.split('T')
      date[0]=date[0].split("-").reverse().join("-");
      const retire0=date[1].split(".")[0]
      date[1]= retire0.substring(0,retire0.length-3)

      if(Date.parse(date[0])===Date.parse(todayDate)){
        return 'Aujourd\'hui, '+date[1]

      }else{
        return date[0]+", "+date[1]
      }

    }


    onMounted(() => {

      axios.get('http://localhost:1337/sub-categories')
          .then(response => {
            response.data.forEach(element => {
              if(!categories.value.includes(element.category.name)){
                categories.value.push(element.category.name)
              }
            })

            categories.value.forEach(el => {
              sous_categories.value.push({category:el, sub_category:[]})
            })

            response.data.forEach(element => {
              sous_categories.value.forEach(e => {
                if (e.category === element.category.name) {
                  e.sub_category.push(element.name)
                }
              })
            })
          })
          .catch(error=> console.log(error));



      axios.get('http://localhost:1337/products')
          .then(response => {

            products.value=response.data;
            products.value.forEach(product => {
              product.date=theDate(product.date);

              product.images.forEach(image =>{
                image.url='http://localhost:1337'+image.url;
              })
            })
          })
          .catch(error => console.log(error));

    })






    return{
      categories, sous_categories, products, getItem, items
    }

  },

}
</script>

<style scoped>

</style>