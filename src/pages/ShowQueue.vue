<template>
    <div>
        
        <div class = "content">

    <div class = "content-left"> 
        <h1 class = "rightHead">คิวที่เรียกแล้ว</h1>
        <table>
        <tr>
            <th>หมายเลขคิว</th>
            <th>ห้องตรวจที่</th>
        </tr>
        <tr v-for = "queue in PastThreeQueue" v-bind:key = "queue.queueName">
            <td>{{queue.queueName}}</td>
            <td>{{queue.room}}</td>
        </tr>
        </table>

    </div>

    <div class = "content-right"> 
        <h1>คิวต่อไป</h1>
        <table>
        <tr v-for = "queue in NextQueue" v-bind:key = "queue.queueName">
            <td>{{queue.queueName}}</td>
        </tr>
        </table>
    </div>

    </div>
    </div>
</template>

<script>
export default {
    name: "ShowQueue",
    data: function() {
        return {
            PastThreeQueue: [{queueName: 'A000', room: '4'},{queueName: 'A001', room: '3'},{queueName: 'A002', room: '2'}],
            NextQueue: [{queueName: 'A003'},{queueName: 'A004'},{queueName: 'A005'}]
        }
    }

}
</script>

<style scoped>
.content {
    padding-top: 3%;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}
.content-left {
    text-align: center;
    display:inline-block;
    flex: 60%;
    border-right: 1px solid #aaa;
}
.content-right {
    display:inline-block;
    flex: 40%;
    text-align: center;
    display: flex;
    flex-direction: column;
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
    padding: 5%;
}
.rightHead {
    margin-bottom: 10%;
}

</style>