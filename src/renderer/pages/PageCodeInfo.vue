<template>
<div>
  <div class="theory" v-html="template">

  </div>

  <div v-html="view"></div>
  <div class="footer">
    <md-button class="md-raised md-primary" @click="loadEncodeData">Пройти тест на кодування</md-button>
    <md-button class="md-raised md-primary" @click="showDialog = true">Пройти тест декодування</md-button>
    <md-button class="md-big md-raised md-primary" href="/"><p>На головну</p></md-button>
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
      showDialog: false,
      template: '',
      view: ''
    }
  },
  created() {
    axios.post('http://localhost:9090/codedetails', {
        module_name: this.id
      })
      .then(response => {
        this.template = response.data.description;
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  },

  methods: {
    loadEncodeData() {
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
    this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.theory{
  
}
.matrix-bottom-text-area{
  width: 500px;
}
.md-dialog-actions{
  display: flex;
  justify-content: space-around;
}
.md-dialog {
    width: 500px;
    max-width: 768px;
  }
.header {
    text-align: center;
    font-size: 23px;
}
.header-code {
    text-align: center;
}
.footer {
  text-align: center;
}
.md-button {  
  border: 1px solid black;
  color: black;
}
.md-content {
    width: 200px;
    height: 200px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
</style>
