<template>
   <div class="container" id="menu">
    <div class="input-group" id="input-group">
        <span class="input-group-text" id="basic-addon1">ID</span>
        <input @input.prevent="sendId" v-model="id" type="text" class="form-control" placeholder="Find Unit" aria-label="Find Unit" aria-describedby="basic-addon1">
    </div>
    <img src="../assets/ibm-logo_3.png" alt="" id="img">
    <button id="btn" @click.prevent="call">Click Me</button>
    <div class="form">

    </div>
   </div>
</template>


<script>

export default{
    data(){
        return{
            id: '',
            btn:false,
        }
    },

    methods:{
        sendId(){
            console.log("ola")
        },
        call(){

        }
    }
        
}


</script>

<style>

#menu{
    display: flex;
    position: relative;
    height: 3pc;
    top: 10px;
    flex: auto;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
}

#img{
    height: 200%;
    object-fit: contain;
    filter: brightness(0) invert(1);
}

#btn{
    display: block;
    position: relative;
}

#input-group{
    width: 20%;
    display: flex;
}
</style>