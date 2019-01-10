<template>
<div class="main">
  <div class="asside-block">
    <div class="top-btn">
      <md-button class="md-raised md-primary" @click="SwitchTest">Показати теорію</md-button>
      <md-button class="md-raised md-primary" @click="loadEncodeData" style="margin-left: 8px;">Пройти навчання на кодування</md-button>
      <md-button class="md-raised md-primary" @click="loadDecodeData" style="margin-left: 8px;">Пройти навчання декодування</md-button>
      <md-button class="md-raised md-primary" href="/" style="margin-left: 8px;">На головну</md-button>
    </div>
  </div>
    <div class="theory" v-html="template" v-show="encodeTests && decodeTests"></div>
    <div class="encode" v-show="!encodeTests && decodeTests">
      <p v-if="resultCode === true" style="color: green; margin: 0 auto; font-size: 20px">Завдання виконано вірно!</p>
      <p v-if="resultCode === false" style="color: red; margin: 0 auto; font-size: 20px">Завдання виконано не вірно!</p>
      <div v-html="view"></div>
      <div class="form-btn"> 
        <md-button class="check-btn" @click="CheckEncode">Перевірити!</md-button>
        <md-button class="check-btn" @click="loadEncodeAnswer" style="margin-left: 8px;">Показати відповідь</md-button>
      </div>
    </div>
    <div class="encode" v-show="!decodeTests && encodeTests">
      <p v-if="resultCode === true" style="color: green; margin: 0 auto; font-size: 20px">Завдання виконано вірно!</p>
      <p v-if="resultCode === false" style="color: red; margin: 0 auto; font-size: 20px">Завдання виконано не вірно!</p>
      <div v-html="decodeView"></div>
      <div class="form-btn"> 
        <md-button class="check-btn" @click="CheckDecode">Перевірити!</md-button>
        <md-button class="check-btn" @click="loadEncodeAnswer" style="margin-left: 8px;">Показати відповідь</md-button>
      </div>
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
      decodeTests: true,
      encodeTests: true,
      template: '',
      view: '',
      decodeView: '',
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
    // axios.post('http://127.0.0.1:9090/encodedata', {
    //     module_name: this.id
    //   })
    //   .then(response => {
    //     this.view = response.data.view;
    //     this.message = response.data.data
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     // handle error
    //     console.log(error);
    //   });
    //   axios.post('http://127.0.0.1:9090/decodedata', {
    //     module_name: this.id
    //   })
    //   .then(response => {
    //     this.view = response.data.view;
    //     this.message = response.data.data
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     // handle error
    //     console.log(error);
    //   });
  },

  methods: {
    SwitchTest() {
      this.decodeTests = true,
      this.encodeTests = true
    },
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
      this.encodeTests = false
      this.decodeTests = true
    },
    loadEncodeAnswer() {
      axios.post('http://127.0.0.1:9090/encodeanswer', {
        data: this.message
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
      this.encodeTests = false
      this.decodeTests = true
    },
    loadDecodeData() {
      axios.post('http://127.0.0.1:9090/decodedata', {
        module_name: this.id
      })
      .then(response => {
        this.decodeView = response.data.view;
        this.message = response.data.data
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
      this.decodeTests = false
      this.encodeTests = true
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
    },
    CheckDecode() {
      var DecodeanswersRequest = null;
      let decodeanswers = document.getElementsByName("answer");

      if (decodeanswers.length === 1)
          DecodeanswersRequest = decodeanswers[0].value;
      else {
          DecodeanswersRequest = new Array();
          for (var decodeanswer of decodeanswers) {
              DecodeanswersRequest.push(decodeanswer.value)
          }
      }

      axios.post('http://127.0.0.1:9090/decoderesult', {
        module_name: this.id,
        data: this.message,
        answer: DecodeanswersRequest
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
.check-btn{
  width: 350px;
}
.form-btn{
  display: flex;
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
