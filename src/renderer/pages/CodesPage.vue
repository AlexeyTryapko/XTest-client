<template>
<div>
  <md-button class="md-primary md-raised" href="/">
    <p style="color: black">На головну</p>
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
    axios.get(`http://localhost:9090/${this.category['.key']}`, {
      headers: {
        headers: {"Access-Control-Allow-Origin": "*"}
      }
    })
      .then(response => {
        this.codes = response.data;
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  },
  data() {
    return {
      category: Object.values(sourceData.categories)
        .filter(category => category['.key'] === this.id)[0],
      codes: [],
    }
  },
}
</script>
