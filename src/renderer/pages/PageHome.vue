<template>
<div>
  <md-button class="md-primary lang-sw" @click="ENLang">en</md-button>
  <md-button class="md-primary lang-sw" @click="UALang">ua</md-button>
  <header class="md-layout md-alignment-top-center">
    <h1 class="md-display-4">XTest</h1>
  </header>
  <main class="md-layout md-alignment-center-center">
    <CategoryList :categories="categories" />
  </main>
</div>
</template>

<script>
import axios from 'axios'
import sourceData from '../data'
import PageCodeInfo from '../pages/PageCodeInfo'
import CategoryList from '../components/CategoryList'

export default {
  components: {
    CategoryList,
    PageCodeInfo
  },
  data() {
    return {
      lang: "ua",
      categories: Object.values(sourceData["ua"].categories),
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'checkLang'
  },
  methods: {
    checkLang(){
      axios.get('http://localhost:9090/getlang')
        .then(response => {
          console.log('Main page')
          this.category = Object.values(sourceData[response.data.language].categories);
          this.lang = response.data.language;
          console.log(response);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },
    ENLang() {
      axios.post('http://127.0.0.1:9090/lang', {
          "lang": "en"
        })
        .then(response => {
          this.view = response.data.view;
          this.lang = "en";
          this.categories = Object.values(sourceData["en"].categories);
          console.log(response);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },

    UALang() {
      axios.post('http://127.0.0.1:9090/lang', {
          "lang": "ua"
        })
        .then(response => {
          this.view = response.data.view;
          this.lang = "ua";
          this.categories = Object.values(sourceData["ua"].categories);
          console.log(response);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    }
  }
}
</script>
<style scoped>
.lang-sw {
  border: 1px solid black;
  border-radius: 5px;
  background-color: burlywood;
}
</style>
