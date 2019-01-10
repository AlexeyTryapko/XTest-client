<template>
<div>
  <md-button class="md-primary md-raised home-btn" style="background-color: white; border-radius: 5px;">
    <router-link to="/">
     <p style="color: black">{{ toHome }}</p>
    </router-link>
  </md-button>
  <header class="md-layout md-alignment-top-center">
    <h3 class="md-display-4">{{category.title}}</h3>
  </header>
  <main class="md-layout md-alignment-center-center">
    <CodesList :codes="codes" />
  </main>
</div>
</template>

<script>
import sourceData from '../data'
import CodesList from '../components/CodesList'
import axios from 'axios'

export default {
  components: {
    CodesList,
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  created() {
      axios.get(`http://localhost:9090/${this.category['.key']}`)
      .then(response => {
        const codesObj = response.data.codes;
        for(const codeField in codesObj) {
          this.codes.push({[codeField]: codesObj[codeField]})
        }
      })
      .catch(error => {
        console.log(error);
      });
      axios.get('http://localhost:9090/getlang')
        .then(response => {
          this.category = Object.values(sourceData[response.data.language].categories)
            .filter(category => category['.key'] === this.id)[0];
          this.lang = response.data.language;
          this.toHome = sourceData[response.data.language].toHome;
          console.log(response);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
  },
  data() {
    return {
      toHome: sourceData["ua"].toHome,
      lang: "ua",
      category: Object.values(sourceData["ua"].categories)
        .filter(category => category['.key'] === this.id)[0],
      codes: []
    }
  },
}
</script>

<style>
</style>
