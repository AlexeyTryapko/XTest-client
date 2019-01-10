<template>
<div class="main">
  <div class="asside-block">
    <div class="top-btn">
      <md-button class="md-raised md-primary" @click="showDialog = true">{{ showTheory }}</md-button>
      <md-button class="md-raised md-primary" @click="loadEncodeData">{{ startEncodeTest }}</md-button>
      <md-button class="md-raised md-primary" >{{ startDecodeTest }}</md-button>
      <md-button class="md-raised md-primary" href="/">{{ toHome }}</md-button>
    </div>
  </div>
  <div class="theory" v-html="template" v-show="showDialog"></div>
  <div v-html="view" class="encode" v-show="!showDialog"></div>
</div>
</template>

<script>
import axios from 'axios'
import sourceData from '../data'

export default {
  props: {
    id: {
      required: true,
      type: String,
    }
  },
  data() {
    return {
      showDialog: true,
      template: '',
      view: '',
      lang: '',
      toHome: sourceData['ua'].toHome,
      showTheory: sourceData['ua'].showTheory,
      startEncodeTest: sourceData['ua'].startEncodeTest,
      startDecodeTest: sourceData['ua'].startDecodeTest,
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
      axios.get('http://localhost:9090/getlang')
        .then(response => {
          this.lang = response.data.language;
          this.toHome = sourceData[response.data.language].toHome;
          this.showTheory = sourceData[response.data.language].showTheory;
          this.startEncodeTest = sourceData[response.data.language].startEncodeTest;
          this.startDecodeTest = sourceData[response.data.language].startDecodeTest;
          console.log(response);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
  },
  methods: {
    loadEncodeData() {
      this.showDialog = false
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
  width: px;
}
.bottom-btn{
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 0;
}
.encode{
  margin: 0 auto;
  border: 1px solid black;
  height: auto;
}
.theory {
    padding: 10px;
    width: 90%;
}
.matrix-bottom-text-area {
    width: 500px;
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
