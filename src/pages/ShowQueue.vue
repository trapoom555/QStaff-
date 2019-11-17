<template>
    <div>
        <div class="headder"> 
            <div class="ver-center">Q plus++ 
            
</div>
        </div>
        <div class = "content">
            <div class = "content-left"> 
        <table style="border-spacing: 15px 7px;">
        <tr>
            <th style="color:black;">หมายเลขคิว</th>
            <th style="color:black;">ห้องตรวจที่</th>
        </tr>
        <tr v-for = "queue in PastThreeQueue" v-bind:key = "queue.queueName">
            <td style="background:#33cccc;color:white;">{{queue.queueName}}</td>
            <td style="background:#70dbdb;color:white;">{{queue.room}}</td>
        </tr>
        </table>

    </div>

    <div class = "content-right"> 
        <table style="border-spacing: 15px 7px;">
            <tr>
                <th style="color:black;">คิวต่อไป</th>
            </tr>
        <tr v-for = "queue in NextQueue" v-bind:key = "queue.queueName">
            <td style=" background:white;color:black;opacity:0.75; " >{{queue.queueName}}</td>
        </tr>
        </table>
    </div>

    </div>
    <div class="footer" style="width:100%;">
       <div class="ver-center" style="color:white;  display:inline; "><marquee width="100%" direction="right" style="color:white;">
        BANKOK HOSPITAL COMUNITY WITH FIBO
        </marquee>
        <div class="ver-center" style="text-align:center;color:white; left:auto;margin:0 0 0 1%; padding:0 0 0 1%; width:30%; border-left:3px solid white">โรงพยาบาลปลาแห่งประเทศไทย</div>
        </div> 
        
    </div>
    </div>
</template>

<script>
export default {
    name: "ShowQueue",
    data: function() {
        return {
            PastThreeQueue: [{queueName: 'A000', room: '1'},{queueName: 'A001', room: '2'},{queueName: 'A002', room: '3'},{queueName: 'A003', room: '4'}],
            NextQueue: [{queueName: 'A004'},{queueName: 'A005'},{queueName: 'A006'}]
        }
    }

}
</script>

<style scoped>

.footer{
    height: 7%;
    width: 100%;
    background:#33cccc; 
    position: fixed;
    float:bottom;
   left: 0;
   bottom: 0;
   width: 100%;
   text-align: center;
   font-size: 1.5vw;
   opacity:0.9;
}

.headder{
    width: 100%;
    height: 10%;
    text-align: left;
    position: absolute;
    background: white;
    box-shadow: 0px 3px 20px gray;
    font-size: 3vw;
    z-index: 12;
}
.content {
    padding-top: 8%;
    padding-bottom: 2%;
    display: flex;
    position: fixed;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-image: url('../assets/hospital.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;  
    background-size: cover;
    
}
.content-left {
    text-align: center;
    display:inline-block;
    flex: 60%;
    
}
.ver-center {
  margin: 0;
  left: 20px;
  position: absolute;
  top:50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 70%;
    display: inline-block;
}
.content-right {
    display:inline-block;
    flex: 40%;
    text-align: center;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    height: 100%;
}

* {
    font-family: 'Noto Sans Thai Cound', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
    font-style: normal;
    color: #555;
   
}
table {
    text-align: center;
    width: 100%;
    font-size: 2.5vw;
}
td {
    padding: 3%;
     -webkit-text-stroke-width: 0.25px;
   -webkit-text-stroke-color: rgb(143, 143, 143);
    
}
.rightHead {
    margin-bottom: 5%;
    border-radius: 0 0px 0px 0;
    font-size: 5vw;
    color: black;
    padding:2% 0;
}
th{
      background: #eaecee;
      padding: 8px 0;
      
}
</style>