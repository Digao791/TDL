<template>
   <div class="container" id="menu">
    <div class="input-group" id="input-group">
        <span class="input-group-text" id="basic-addon1">ID</span>
        <input type="text" class="form-control" placeholder="Find Unit" aria-label="Find Unit" aria-describedby="basic-addon1">
    </div>
   </div>
</template>


<script>

import Map from './Map.vue';

export default{
    data(){
        return{
        
        }
    },
        
}

</script>

<style>

#menu{
    display: flex;
    position: relative;
    height: 3pc;
    top: 10px;
    background-color: red;
    flex: auto;
}

#input-group{
    width: 50%;
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    position: relative;
}
</style>