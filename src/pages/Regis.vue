<template>
<div class = "all">
<div class = "header">
<img src = "../assets/logo.png">
<div class = "logo-des"><p class = "queue">QUEUE</p><p class = "plus">PLUS++</p></div>
<div class = "id"># Register</div>
</div>

<div class = "content">
    <div class = "content-left"> 
        <div class = "dot"><div class = "dotIn"><div class="quewrap"><h2 class = "textque">คิวที่</h2><h1 class = "quenum">{{(process.q_list.length == 0 && !check) ? "out of queue": check ? process.q_call : "รอกดคิว"}}</h1></div></div></div>
    </div>

    <div class = "content-right"> 
        <p :class = "{hidden: !check}" style = "font-size: 1.5vw; margin-top: 4%;">คุณ {{user.name}}</p>
        <div class = "time">เวลาตรวจ: {{displayMinutes}}:{{displaySeconds}}</div>
        <button class = "start" v-on:click = "start" :class = "{disable: state}">เรียกคิว</button>
        <button class = "finished" v-on:click = "stop" :class = "{disable: !state}">เสร็จสิ้น</button>
    </div>
</div> 
</div>
</template>

<script>
/* eslint-disable no-console */
import {db} from '../firebase'
// import { rtb } from '../../firestore-1/src/firebase'
const users = db.collection('user')
// const departments = db.collection('department')

const Processes = db.collection('process')
var temp
var Qplus_user = false;
temp = Qplus_user;
export default {
    name: 'Regis',
    data: function() {
        return {
            user: '',
            queue: "00A4",
            minutes: 0,
            seconds: 0,
            displayMinutes: '00',
            displaySeconds: '00',
            state: 0,
            Monitor: '',
            out: '',
            process: '',
            process_doc: 'ลงทะเบียนผู้ป่วย',
            check: false
        }
    },
    created(){
      this.$bind('process', Processes.doc(this.process_doc)).then(process => {
        // user will point to the same property declared in data:
        this.process === process
        this.out = this.process.name
        console.log(this.process);
        // this.out = this.user.name
      })
    },
    methods: {
    toggleState: function() {
        // if(!this.check && this.process.q_list.length == 0){
                // console.log('asdfasd')
            // }
            // else {
                this.state = !this.state;
                // console.log(';lkj;lkj')
            // }
    },
    updateDisplay: function() {
        if(this.minutes / 10 < 1){
            this.displayMinutes = '0' + this.minutes.toString();
        }
        else {
            this.displayMinutes = this.minutes.toString();
        }
        if(this.seconds / 10 < 1){
            this.displaySeconds = '0' + this.seconds.toString();
        }
        else {
            this.displaySeconds = this.seconds.toString();
        }
    },
    add: function() {
        if(this.state){ this.timer();  
        this.seconds++;
        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes++;
        }
        this.updateDisplay();
        }
    },
    timer: function() {
        setTimeout(this.add,1000);
    },
    start: function() {
        if(this.process.q_list.length != 0){
            this.check = true;
            this.timer();
            console.log('pass')
            this.toggleState();
            this.startRTB();
        }
    },
    clearTime: function() {
        this.minutes = 0;
        this.seconds = 0;
        this.updateDisplay();
    },
    stop: function() {
        this.check = false;
        this.toggleState();
        this.clearTime();
        this.stopRTB();
    },
    stopRTB: function() {

      console.log(this.user.ID+'XXX')
        this.user.process_list[this.user.process_list.length-1].status = 'pass'
        users.doc(this.user.ID).set(this.user);
        console.log(this.user.process_list[this.user.process_list.length-1].status)
        this.user.process_list.push({
            type : 'department',
            name : 'OPD',
            status : '-'
        })
        this.user.queueRef = db.collection('department').doc('OPD')
        this.user.waitConfirm = true
        users.doc(this.user.ID).set(this.user);
        // this.out = temp
        // this.$bind('department', departments.doc('OPD')).then(department => {
        //   console.log('hoho')
        //   this.department === department
        //   this.department.q_run+=1
        //   console.log('wtf')
        //   this.out = 55
          
        //   console.log('wannadie')
        //   this.department.q_list.push({userID:this.user.ID,queue:this.department.q_run})
        //   console.log(this.department.q_list)
        //   departments.doc('OPD').set(this.department).then(() => {
        //     this.out = this.department.q_run
        //   })
        //   console.log(555)
        // })
    },
    startRTB: function() {
         if(this.process.q_list.length=== 0){
        this.out = 'out of queue'
        Qplus_user = false
      }
      else{
        /* eslint-disable no-console */
        temp = this.process.q_list.shift()
        // console.log('wesfdzxfeas')
        // temp = this.process.q_list[0]
        // console.log(temp)
        this.process.q_call = temp.queue
        Processes.doc(this.process_doc).set(this.process)
        this.$bind('user', users.doc(temp.userID)).then(user => {
          this.user === user
          if(user.name == '-'){
            Qplus_user = false
          }
          else{
            Qplus_user = true
            this.user.process_list[this.user.process_list.length-1].status = 0
            this.user.queueRef = Processes.doc(this.process_doc)
            users.doc(this.user.ID).set(this.user)
          }
          this.out = user.ID
          console.log("aedaef")
        })
        
      }
    }
},
}
</script>

<style scoped>
@font-face {
    font-family: 'Noto Sans Thai Cound';
    src: url('../assets/fonts/NotoSansThaiUI-SemiCondensedLight.woff2');
}

h1 {
    margin-top: 11%;
    font-size: 2.5vw;
    color: #494949;
    letter-spacing: 1px;
}

.hidden {
    visibility: hidden;
}

.id {
    display: inline;
    margin-right: 5%;
    float: right;
    margin-top: 1.5%;
    font-size: 2vw;
    color: #aaa;
}

.textque {
    font-size: 3.5vw;
    color: #1C89A0;
    margin-top: 15%;
}

.quenum {
    font-size: 4.7vw;
    color: #616161;
}

* {
    font-family: 'Noto Sans Thai Cound', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 300;
    font-style: normal;
}

.quewrap {
    text-align: center;
}


.select {
    width: 70%;
    font-size: 1.5vw;
    margin-top: 5%;
    height:30px;
    margin-bottom: 3.5%;
}
.all {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 1%;
}

.header {
    border-bottom: 1px solid #aaa;
    flex: 11%;
}

.time {
    margin-top: 2%;
    font-size: 1.5vw;
    color: #616161;
}
.finished {
     display: block;
     margin: auto;
     margin-top: 5%;
     height: 10%;
     width: 50%;
     border-radius: 5px;
     background: linear-gradient(280.58deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0;
     border: none;
     font-size: 2vw;
}
img {
    width: 6%;
    margin-top: 0.5%;
    margin-left: 2%;
    display: inline-block;
    vertical-align: -90%;
}
.logo-des {
    display: inline-block;
    margin-left: 0.25%;
    vertical-align: 30%;
    margin-bottom: 2%;
    font-size: 1.25vw;
    letter-spacing: 1px;
}
.content {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}
.content-left {
    display:inline-block;
    flex: 50%;
    border-right: 1px solid #aaa;
}
.content-right {
    display:inline-block;
    flex: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
}

p {
    margin: 0%;
}
.queue {
    color:#1EA8C7;
    font-weight: 400;
}
.plus {
    color: #D252FF;
}

.dot {
  height: 30vw;
  width: 30vw;
  transform: translate(-50%);
  margin-top: 75px;
  margin-left: 50%;
  border-radius: 50%;
  display: flex;
  background: linear-gradient(280.58deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0;
}
 .dotIn {
    height: 29vw;
    width: 29vw;
    margin: auto;
    background: white;
    border-radius: 50%;
 }

 .start {
     display: block;
     margin: auto;
     margin-top: 15%;
     margin-bottom: 7%;
     height: 10%;
     width: 50%;
     border-radius: 5px;
     background: linear-gradient(280.58deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0;
     border: none;
     font-size: 2vw;
 }

 .disable {
    pointer-events:none; 
    opacity:0.6;  
}

</style>