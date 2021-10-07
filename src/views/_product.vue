<template>
    <div class="mb-12">
      <NavBar/>

      <div class="w-700 mx-auto">

        <div id="slider">

          <div id="carousel" class="flex justify-start" >
            <div id="carousel-inner" class="relative w-700 h-500 ">

              <button type="button" id="carousel-control left" class="absolute z-10 bg-gray-200 rounded-full border-none inline-block w-10 h-10 text-white left-0 top-1/2" @click="prev" ><i class="fas fa-arrow-left"></i></button>

              <caroussel-item v-for="(image,index) in product.images"
                              :key="image.id"
                              :image="image.url"
                              :title="product.title"
                              :currentSlide="currentSlide"
                              :index="index"/>

              <button type="button" id="carousel-control right" class="bg-gray-200 rounded-full border-none inline-block absolute w-10 h-10 text-white right-0 top-1/2" @click="next"><i class="fas fa-arrow-right"></i></button>

            </div>


          </div>

        </div>


        <div class="flex flex-col justify-around space-y-10">
          <div>
            <div>
              <h1 class="font-bold text-2xl">{{product.title}}</h1>
            </div>

            <div>
              <h4 class="font-semibold">{{product.price}} €</h4>
            </div>

            <div class="flex justify-between">
              <p class="self-end">{{product.date}}</p>
              <router-link to="/accueil" class="py-2 px-5 bg-black text-white rounded">Retour</router-link>
            </div>
          </div>

          <div class="border-solid border-b-2 border-gray-400 "></div>

          <div>
            <div>
              <p class="text-2xl font-semibold">Description</p>
              <p>{{product.description}}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
import NavBar from "../components/NavBar";
import axios from "axios";
import CarousselItem from "../components/CarousselItem";
import {onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
export default {
  name: "_product",
  components: {CarousselItem, NavBar},
  setup() {
    const product=ref({});
    const currentSlide=ref(1);
    const route=useRoute();

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


    function setCurrentSlide(index){
      currentSlide.value=index;
    }

    function prev() {
      const index= currentSlide.value > 0 ? currentSlide.value-1 : product.value.images.length-1;
      setCurrentSlide(index)
    }

    function next() {
      const index= currentSlide.value < product.value.images.length-1 ? currentSlide.value+1 : 0;
      setCurrentSlide(index)
    }



    onMounted(() => {
      axios.get('http://localhost:1337/products/'+route.params.id)
          .then(response => {
            product.value=response.data;
            product.value.date=theDate(product.value.date);

            product.value.images.forEach(image =>{
              image.url='http://localhost:1337'+image.url;
            })
          })
          .catch(error => console.log(error));
    })



    return {
      product, currentSlide, prev, next, setCurrentSlide
    }


  },


}
</script>

<style scoped>




</style>