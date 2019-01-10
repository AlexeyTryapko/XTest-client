<template>
<div class="main">
  <div class="asside-block">
    <div class="top-btn">
      <md-button class="md-raised md-primary" @click="loadEncodeData">Пройти тест на кодування</md-button>
      <md-button class="md-raised md-primary" @click="showDialog = true" style="margin-left: 8px">Пройти тест декодування</md-button>
    </div>
    <div class="bottom-btn">
      <md-button class="md-raised md-primary" href="/">
        <p>На головну</p>
      </md-button>
    </div>
  </div>
  <div class="theory" v-html="template">

  </div>
  <div v-html="view"></div>
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
.main {
    display: flex;
    flex-direction: row;
    position: relative;
}
.top-btn{
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: sticky;
  width: 250px;
  top: 0;
}
.bottom-btn{
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 10px;
}
.asside-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    padding: 10px;
}
.md-button {
    border: 1px solid black;
    color: black;
}
.theory {
    padding: 10px;
    width: 90%;
}
// .matrix-bottom-text-area {
//     width: 500px;
// }
// .md-dialog-actions {
//     display: flex;
//     justify-content: space-around;
// }
// .md-dialog {
//     width: 500px;
//     max-width: 768px;
// }
// .header {
//     text-align: center;
//     font-size: 23px;
// }
// .header-code {
//     text-align: center;
// }
// .md-content {
//     width: 200px;
//     height: 200px;
//     display: inline-flex;
//     justify-content: center;
//     align-items: center;
// }
</style>
