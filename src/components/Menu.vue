<template>
   <div class="container" id="menu">
    <div class="input-group" id="input-group">
        <span class="input-group-text" id="basic-addon1">ID</span>
        <input @input.prevent="sendId" v-model="id" type="text" class="form-control" placeholder="Find Unit" aria-label="Find Unit" aria-describedby="basic-addon1">
    </div>
    <img src="../assets/ibm-logo_3.png" alt="" id="img">
    <div class="form">

    </div>
   </div>
</template>


<script>

import Map from './Map.vue';
export default{
    data(){
        return{
            id: ''
        }
    },

    methods:{
        sendId(){
            console.log("ola")
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

#input-group{
    width: 20%;
    display: flex;
}
</style>