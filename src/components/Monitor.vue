<template>
<div class = "all">
<div class = "header">
<img src = "../assets/logo.png">
<div class = "logo-des"><p class = "queue">QUEUE</p><p class = "plus">PLUS++</p></div>
<div class = "id">ID # {{id}}</div>
</div>

<div class = "content">
    <div class = "content-left"> 
        <div class = "dot"><div class = "dotIn"><div class="quewrap"><h2 class = "textque">คิวที่</h2><h1 class = "quenum">{{this.check ? (doctor.q_list[0].queue) : (this.department.q_list.length != 0 || this.doctor.q_list.length != 0)? "รอกดคิว":"out of queue"}}</h1></div></div></div>
        <button class = "start" :class = "{disable: state}" v-on:click = "callQueueFunc">เรียกคิว</button>
    </div>

    <div class = "content-right"> 
        <p :class = "{hidden: !check}" style = "font-size: 1.5vw; margin-top: 4vh;">คุณ {{user.name}}</p>
        <div class = "time">เวลาตรวจ: {{displayMinutes}}:{{displaySeconds}}</div>
        <h1>กระบวนการถัดไป</h1>
        <div class = "dropdown">
        <select class = "select" v-model = "nextProcess">
            <option value="" disabled selected>เลือกกระบวนการถัดไป</option>
            <option v-for = "eiei in processes" v-bind:key = "eiei.id" v-bind:value="eiei.process">{{eiei.process}}</option>
        </select>
        </div>
        <button class = "finished" v-on:click = "setProcess" :class = "{disable: !state || !nextProcess}">ตรวจเสร็จสิ้น</button>
    </div>
</div> 
</div>
</template>

<script>
/* eslint-disable no-console */
import {db} from '../firebase'
// import { rtb } from '../../firestore-1/src/firebase'
const users = db.collection('user')
const departments = db.collection('department')
var staffRef,departmentRef
// const processes = db.collection('process')
var temp,Quser

export default {
    
    name: 'Monitor',
    data: function() {
        return {
            queue: "00A4",
            minutes: 0,
            seconds: 0,
            displayMinutes: '00',
            displaySeconds: '00',
            state: 0,
            nextProcess: '',
            processes: [
                {id: 1, process: 'เจาะเลือด'},
                {id: 2, process: 'X-ray'},
                {id: 3, process: 'ชำระเงิน'}
                ],
            process : '',
            processName : 'X-ray',
            check : false,
            user : 'Nan',
            out : "",
            department : 'Nan',
            doctor : '',
            departmentName:'OPD',
            aaa : 0,
            btncheck: false,
            rtbSecond: 0,

        }
    },
    // firestore:{
    //     department : departmentRef,
    //     doctor : staffRef
    // },
    props: {
        departmentId: String,
        id: Number,
        OPDId: String
    },
    created(){
      departmentRef = departments.doc(this.$props.departmentId)
      staffRef = departmentRef.collection('Doctors').doc(this.$props.OPDId)
      
      this.$bind('department', departmentRef)
      this.$bind('doctor', staffRef).then(doctor => {
        this.out = doctor.ID 
        console.log("department" + this.department)
        console.log("doctor" + this.doctor)
      })
    },
    methods: {
        toggleState: function() {
            if(!this.check && (this.department.q_list.length == 0 && this.doctor.q_list.length == 0)  ){
                // this.check = false
                //ไม่กำลังตรวจอยู่ และ คิวซักคิวเป็น 0
                console.log('asdfasd')
            }
            else {
                this.state = !this.state;
                // console.log(this.state)
            }
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
            this.rtbSecond += 1;
            }
        },
        timer: function() {
            setTimeout(this.add,1000);
        },
        start: function() {
            this.toggleState();
            this.timer();
        },
        clearTime: function() {
            this.minutes = 0;
            this.seconds = 0;
            this.rtbSecond = 0;
            this.updateDisplay();
        },
        stop: function() {
            this.btncheck = false
            this.check = false
            this.toggleState();
            this.department.time.push(this.rtbSecond)
            departments.doc(this.department.name).update({time : this.department.time})
            this.clearTime();
        },
        callQueueFunc(){
            if(this.doctor.q_list.length != 0 || this.department.q_list.length != 0){
                this.callQueue();
            }
        },
        callQueue(){
            this.start();
            if(this.doctor.q_list.length == 0){
                temp = this.department.q_list.shift()
                this.doctor.q_call = 0
                this.doctor.q_run = 0
                ////////////////////////////////////////////
                ////////// อย่าลืมเปลี่ยนกลับ!!!!!//////////////
                ///////////////////////////////////////////
                // temp = this.department.q_list[0] //-------!!!!!!
                this.doctor.q_list.push(temp)
                this.department.q_call = this.doctor.q_list[0].queue
            }
            else{
                this.doctor.q_call += 1
            }
            
            // this.out = temp.queue
            temp = this.doctor.q_list[0]
            // console.log(temp)
            // this.out = this.department.q_list
            staffRef.set(this.doctor)
            departmentRef.set(this.department)
            Quser = false
            // if(temp.userID != '-'){
                
            this.$bind('user', users.doc(temp.userID)).then(user => {
                this.user === user
                console.log(user)
                if(this.user.name != '-'){
                    Quser = true
                    this.out = this.user.name
                    this.user.process_list.pop()
                    this.user.process_list.push({name:this.$props.OPDId,status:'0',type:'OPD'});
                    ////////////////////////////////
                    this.user.queueRef = 5
                    this.user.queueRef = db.collection('department').doc('OPD').collection('Doctors').doc(this.$props.OPDId)
                    users.doc(temp.userID).set(this.user)
                }
                
            })
            // }
            // temp = this.doctor.ID
            this.check = true
            // this.out = 'wtf'
            

        },
        setProcess(){
            console.log(5312)
            
            console.log('>>>1'+this.doctor.q_list)
            this.doctor.q_list.shift()
            console.log('>>>2'+this.doctor.q_list)
            staffRef.set(this.doctor)
            this.check = false
            this.out = 1
            this.stop();
            /* eslint-disable no-console */
            // console.log(this.nextProcess);
            if (Quser == true){
                this.user.process_list[this.user.process_list.length-1].status = 'pass'
                this.user.process_list.push({name:this.nextProcess,status:'-',type:'process'});
                this.user.queueRef = db.collection('process').doc(this.nextProcess)
                this.user.waitConfirm = true
                users.doc(this.user.ID).set(this.user)
            }
            
            // this.$bind('process', processes.doc(this.nextProcess)).then(process => {
            //     this.process === process
            //     this.process.q_run+=1
            //     this.process.q_list.push({userID:this.user.ID,queue:this.process.q_run})
            //     processes.doc(this.nextProcess).set(this.process)
            //     this.out = this.process 
            //     this.out = 2
            //     this.user.process_list[this.user.process_list.length-1].status = 'pass'
            //     this.out = 1
            //     this.user.process_list.push({name:this.nextProcess,status:this.process.q_run,type:'process'});
            //     this.out = this.process.name
            //     this.user.queueRef = db.collection('process').doc(this.nextProcess)
            //     users.doc(this.user.ID).set(this.user)
                
            // })
        // this.process = ''   
        },
    }
}
</script>

<style scoped>
@font-face {
    font-family: 'Noto Sans Thai Cound';
    src: url('../assets/fonts/NotoSansThaiUI-SemiCondensedLight.woff2');
}

html body {
     width: 100vw;
     padding: 0px;
     margin: 0px;
}
h1 {
    margin-top: 11%;
    font-size: 2.5vw;
    color: #494949;
    letter-spacing: 1px;
}

.id {
    display: inline;
    margin-right: 5%;
    float: right;
    margin-top: 1.5vh;
    font-size: 2vw;
    color: #aaa;
}

.textque {
    font-size: 3.5vw;
    color: #1C89A0;
    margin-top: 15%;
}

.hidden{
    visibility: hidden
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
    margin-top: 5vh;
    height:30px;
    margin-bottom: 3.5vh;
}
.all {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 1vh;
}

.header {
    border-bottom: 1px solid #aaa;
    flex: 11%;
}

.time {
    margin-top: 1vh;
    font-size: 1.5vw;
    color: #616161;
}
.finished {
     display: block;
     margin: auto;
     margin-top: 15vw;
     height: 10vh;
     margin-bottom: 0px;
     width: 30%;
     border-radius: 5px;
     background: linear-gradient(280.58deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0;
     border: none;
     font-size: 2vw;
}
img {
    width: 6%;
    margin-top: 0.5vh;
    margin-left: 2%;
    display: inline-block;
    vertical-align: -90%;
}
.logo-des {
    display: inline-block;
    margin-left: 0.25%;
    vertical-align: 30%;
    margin-bottom: 2vh;
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
    height: 100%;
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
  margin-top: 10vh;
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
     margin-top: 7vh;
     height: 10vh;
     width: 30%;
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