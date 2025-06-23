<template>
   <div class="" id="menu">
    <div class="input-group" id="input-group">
        <input @keyup.enter="call" v-model="id" type="text" class="form-control" placeholder="Find Unit" aria-label="Find Unit" aria-describedby="basic-addon1">
    </div>
    
   </div>
</template>


<script>

import { useEventBus } from '@/server/eventBus'

const {emit} = useEventBus()

export default{
    data(){
        return{
            id: ''
        }
    },
    

    methods:{
        sendId(id){
            console.log("Searching ", id)
        },
        call(){
            emit('_id', this.id == '' ? null : this.id)
        }
    }
        
}


</script>

<style>

#menu{
    display: block;
    position: relative;
    z-index: 10;
    height: 3pc;
    width: 800px;
    margin: auto;
    opacity: 85%;
}

#img{
    display: flex;
    position: absolute;
    height: 200%;
    object-fit: contain;
    filter: brightness(0) invert(1);
}

#btn{
    display: block;
    position: relative;
}

#input-group{
    width: 60%;
    display: flex;
    margin: auto;
    top: 20%;
}

#input-group > input{
    text-align: center;
}

#filters{
    width: 50%;
    position: relative;
    
    right: 0px;
    justify-content: space-between;
    display: flex;
    justify-items: center;
    flex-flow: row;
    color: aliceblue;
}



</style>