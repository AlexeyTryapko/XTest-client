<template>
  <div>
    <div class="theory" v-html="view">

    </div>
    <div class="footer-btn">
      <md-button class="md-raised md-primary">
        <p>Відправити</p>
      </md-button>
      <md-button class="md-big md-raised md-primary" href="/">
        <p>На головну</p>
      </md-button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  props: {
    id: {
      required: true,
      type: String,
    }
  },
  data() {
    return {
      view: ''
    }
  },
  created() {
    axios.post('http://127.0.0.1:9090/encodedata', {
      module_name: this.id
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
}
</script>

<style lang="css">
.theory{
  border: 1px solid black;
} 
.task{
  text-align: center;
}
</style>
