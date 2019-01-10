<template>
<div>
  <md-button class="md-primary lang-sw" @click="ENLang">en</md-button>
  <md-button class="md-primary lang-sw" @click="UALang">ua</md-button>
  <header class="md-layout md-alignment-top-center">
    <h1 class="md-display-4">XTest</h1>
  </header>
  <main class="md-layout md-alignment-center-center">
    <CategoryList :categories="categories"/>
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
      categories: Object.values(sourceData.categories),
    }
  },

  methods: {
    ENLang() {
      axios.post('http://127.0.0.1:9090/lang', {
      "lang": "en"
      })
      .then(response => {
      this.view = response.data.view;
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
.lang-sw{
  border: 1px solid black;
  border-radius: 5px;
  background-color: burlywood;
}
</style>

