<template>
<div class="main">
  <div class="asside-block">
    <div class="top-btn">
      <md-button class="md-raised md-primary" @click="SwitchTest">{{showTheory}}</md-button>
      <md-button class="md-raised md-primary" @click="loadEncodeData" style="margin-left: 8px;">{{startEncodeTest}}</md-button>
      <md-button class="md-raised md-primary" @click="loadDecodeData" style="margin-left: 8px;">{{startDecodeTest}}</md-button>
      <md-button class="md-raised md-primary" @click="loadDecodeData" style="margin-left: 8px;">{{startExam}}</md-button>
      <md-button class="md-raised md-primary" href="/" style="margin-left: 8px;">{{toHome}}</md-button>
    </div>
  </div>
    <div class="theory" v-html="template" v-show="teoryData"></div>
    <div class="encode" v-show="encodeTests">
      <p v-if="resultCode === true" style="color: green; margin: 0 auto; font-size: 20px">{{correctTask}}</p>
      <p v-if="resultCode === false" style="color: red; margin: 0 auto; font-size: 20px">{{uncorrectTask}}</p>
      <div v-html="view"></div>
      <div class="form-btn">
        <md-button class="check-btn" @click="CheckEncode">{{check}}</md-button>
        <md-button class="check-btn" @click="loadEncodeAnswer" style="margin-left: 8px;">{{showAnswer}}</md-button>
      </div>
    </div>
    <div class="encode" v-show="decodeTests">
      <p v-if="resultCode === true" style="color: green; margin: 0 auto; font-size: 20px">{{correctTask}}</p>
      <p v-if="resultCode === false" style="color: red; margin: 0 auto; font-size: 20px">{{uncorrectTask}}</p>
      <div v-html="decodeView"></div>
      <div class="form-btn">
        <md-button class="check-btn" @click="CheckDecode">{{check}}</md-button>
        <md-button class="check-btn" @click="loadEncodeAnswer" style="margin-left: 8px;">{{showAnswer}}</md-button>
      </div>
    </div>
    <div v-show="ExamData" class="encode">
      <div class="exam-form">
        <md-button v-for="exam in examTask" :key="exam" class="asnwer"></md-button>
      </div>
      <div v-html="exam"></div>
      <md-button @click="checkExam">Далі</md-button>
    </div>
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
      ExamData: false,
      teoryData: true,
      decodeTests: false,
      encodeTests: false,
      template: '',
      exam: '',
      view: '',
      decodeView: '',
      message: '',
      result: '',
      resultCode: '',
      examTask: '',
      lang: '',
      toHome: sourceData['ua'].toHome,
      showTheory: sourceData['ua'].showTheory,
      startEncodeTest: sourceData['ua'].startEncodeTest,
      startDecodeTest: sourceData['ua'].startDecodeTest,
      startExam: sourceData['ua'].startExam,
      correctTask: sourceData['ua'].correctTask,
      uncorrectTask: sourceData['ua'].uncorrectTask,
      showAnswer: sourceData['ua'].showAnswer,
      check: sourceData['ua'].check,
    }
  },
  created() {
    axios.post('http://localhost:9090/codedetails', {
        module_name: this.id
      })
      .then(response => {
        this.template = response.data.description;
        this.examTask = response.data.details.exam_tasks
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
          this.startExam = sourceData[response.data.language].startExam;
          this.correctTask = sourceData[response.data.language].correctTask;
          this.uncorrectTask = sourceData[response.data.language].uncorrectTask;
          this.showAnswer = sourceData[response.data.language].showAnswer;
          this.check = sourceData[response.data.language].check;
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
      this.decodeTests = false,
      this.encodeTests = false,
      this.teoryData = true
    },
    loadExamData() {
      axios.post('http://127.0.0.1:9090/encodedata', {
        module_name: this.id
      })
      .then(response => {
        this.exam = response.data.view;
        this.message = response.data.data
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
      this.ExamData = true
      this.encodeTests = false
      this.teoryData = false
      this.decodeTests = false
    },
    checkExam() {
      this.CheckEncode()
      this.loadExamData()
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
      this.encodeTests = true
      this.teoryData = false
      this.decodeTests = false
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
      this.encodeTests = false
      this.teoryData = false
      this.decodeTests = true
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
.asnwer{
}
.exam-form{
  display: flex;
  margin: 10px;
}
.main {
    display: flex;
    flex-direction: row;
    position: relative;
}
.top-btn {
    display: flex;
    flex-direction: column;
    width: px;
}
.bottom-btn {
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    bottom: 0;
}
.check-btn {
    width: 350px;
}
.form-btn {
    display: flex;
}
.encode {
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
