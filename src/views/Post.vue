<template>
  <section class="bg-gray-100 body-font">
    <NavBar/>
    <div class="container lg:w-4/6 px-5 py-24 mx-auto flex flex-wrap flex-col gap-3">
      <div class="flex flex-col relative mb-4">
        <label class="leading-7 text-lg text-gray-600 mb-2">Titre</label>
        <input class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" type="text" id="title" name="title" maxlength="99" v-model="title" required>
      </div>

      <div class="flex flex-col relative mb-4">
        <label class="leading-7 text-lg text-gray-600 mb-2">Image</label>
        <input type="file" id="image" name="image" @change="previewFiles" multiple required>
      </div>

      <div class="flex flex-col relative mb-4">
        <label class="leading-7 text-lg text-gray-600 mb-2">Catégorie</label>

        <select v-model="sousCategories" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" required>
          <optgroup v-for="(category,i) in sous_categories" :key="i" :label="category.category">
            <option v-for="(sousCategorie) in category.sub_category" :key="sousCategorie.id" :value="sousCategorie.id">{{sousCategorie.name}}</option>
          </optgroup>
        </select>
      </div>

      <div class="flex flex-col relative mb-4">
        <label class="leading-7 text-lg text-gray-600 mb-2">Prix</label>
        <input class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" type="number" id="prix" name="prix" v-model.number="price" required>
      </div>

      <div class="flex flex-col relative mb-4">
        <label class="leading-7 text-lg text-gray-600 mb-2">Description</label>
        <textarea class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out resize-none" rows="25"  id="content" name="content" v-model="description" required></textarea>
      </div>

      <div class="mx-auto">
        <button class="rounded bg-blue-600 text-white font-semibold py-2.5 px-5" @click="ajoutPost">Valider</button>
      </div>
    </div>

  </section>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import NavBar from "../components/NavBar";

export default {
  name: "Post",
  components: {NavBar },

  setup(){
    const categories=ref([]);
    const sous_categories=ref([]);
    const title=ref('');
    const price=ref(0);
    const description= ref('');
    const sousCategories=ref(null);


   let files;
    function previewFiles(event){
      files = Array.from(event.target.files);

    }


    function todayDate(){
      const date= new Date();
      return date.toISOString();
    }


    const ajoutPost= () => {

      const formData=new FormData();
      files.forEach(element => {
        formData.append('files',element);
      })

      axios.post('http://localhost:1337/upload', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }})
          .then(response=>
          {
            const images=[];
            response.data.forEach(element => {
              images.push({id:element.id})
            })



            axios.post('http://localhost:1337/products', {
              title:title.value,
              price:price.value,
              description:description.value,
              date:todayDate(),
              sub_category: {
                id:sousCategories.value
              },
              images: images
            }, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              }
            }).then(response => console.log(response))
                .catch(error => console.log(error));
          })
          .catch(error => console.log(error));

    }

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
                e.sub_category.push({id:element.id, name:element.name})
              }
            })
          })
        })
        .catch(error=> console.log(error));




    return{
      categories, sous_categories, ajoutPost, title, description, price, sousCategories, previewFiles
    }

  },
}
</script>

<style scoped>

</style>