<template>
<div>
  <md-button class="md-primary md-raised home-btn" href="/" style="background-color: white; border-radius: 5px;">
    <p style="color: black;">На головну</p>
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
  },
  data() {
    return {
      category: Object.values(sourceData.categories)
        .filter(category => category['.key'] === this.id)[0],
      codes: []
    }
  },
}
</script>

<style>
</style>

