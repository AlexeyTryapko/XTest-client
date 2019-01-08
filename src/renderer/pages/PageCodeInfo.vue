<template>
<div>
  <div class="theory" v-html="template">

  </div>
  <div class="footer-btn">
    <md-button class="md-raised md-primary">
      <router-link :to="{ name: 'EncodePage', params: { id: id } }">
        <p style="color: black">Пройти тест кодування</p>
      </router-link>
    </md-button>
    <md-button class="md-raised md-primary">
      <p>Пройти тест декодування</p>
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
      template: ''
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
}
</script>

<style lang="scss" scoped>
.header {
    text-align: center;
    font-size: 23px;
}
.header-code {
    text-align: center;
}
.footer-btn {
    text-align: center;
}
.md-button {
    background-color: aqua;
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
