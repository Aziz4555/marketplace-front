<template>
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
      <nav v-if="login===null" class="flex lg:w-2/5 flex-wrap items-center text-base justify-center">
        <router-link tag="li"  class="mr-5 hover:text-gray-900 cursor-pointer" to="/signup" active-class="active">S'identifier</router-link>
        <router-link tag="li"  class="mr-5 hover:text-gray-900 cursor-pointer" to="/signin" active-class="active">Se Connecter</router-link>
      </nav>
      <nav v-else class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <router-link tag="li" class="mr-5 hover:text-gray-900 active:bg-green-500" to="/accueil" active-class="router-link-active">Rechercher</router-link>
        <router-link tag="li" class="mr-5 hover:text-gray-900 active:bg-green-500" to="/formpost" active-class="router-link-active">Ajouter une annonce</router-link>
      </nav>
      <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
        <span class="ml-3 text-xl">ELMOWEB</span>
      </a>
      <div v-if="login!==null" class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
        <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" @click="logout">Déconnexion
        </button>
      </div>
    </div>
  </header>

  <router-view/>
</template>

<script>
export default {
  name: "NavBar",
  data(){
    return{
      login:null
    }
  },

  mounted(){
    this.login=localStorage.getItem('userID');
  },
  methods:{
    logout(){
      localStorage.clear();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>


</style>