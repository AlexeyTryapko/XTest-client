<template>
<div class="main">
  <div class="asside-block">
    <div class="top-btn">
      <md-button class="md-raised md-primary" @click="showDialog = true">Показати теорію</md-button>
      <md-button class="md-raised md-primary" @click="loadEncodeData">Пройти тест на кодування</md-button>
      <md-button class="md-raised md-primary" >Пройти тест декодування</md-button>
      <md-button class="md-raised md-primary" href="/">На головну</md-button>
    </div>
  </div>
    <div class="theory" v-html="template" v-show="showDialog"></div>
    <div class="encode" v-show="!showDialog">
      <p v-if="resultCode === true" style="color: green; margin: 0 auto; font-size: 20px">Завдання виконано вірно!</p>
      <p v-if="resultCode === false" style="color: red; margin: 0 auto; font-size: 20px">Завдання виконано не вірно!</p>
      <div v-html="view"></div>
      <md-button class="check-btn" @click="CheckEncode">Перевірити!</md-button>
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
      showDialog: true,
      template: '',
      view: '',
      message: '',
      result: '',
      resultCode: ''
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
        this.message = response.data.data
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
        this.message = response.data.data
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
      this.showDialog = false
    },
    CheckEncode() {
      var answersRequest = null;
      let answers = document.getElementsByName("answer");

      if (answers.length === 1)
          answersRequest = answers[0].value;
      else {
          answersRequest = new Array();
          for (var answer of answers) {
              answersRequest.push(answer.value)
          }
      }

      axios.post('http://127.0.0.1:9090/encoderesult', {
        module_name: this.id,
        data: this.message,
        answer: answersRequest
      })
      .then(response => {
        this.resultCode = response.data.result;
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
  display: flex;
  flex-direction: column;
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
