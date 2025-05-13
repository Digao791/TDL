<template>
   <div class="container" id="menu">
    <div class="input-group" id="input-group">
        <span class="input-group-text" id="basic-addon1">ID</span>
        <input @keyup.enter="call" v-model="id" type="text" class="form-control" placeholder="Find Unit" aria-label="Find Unit" aria-describedby="basic-addon1">
    </div>
    <img src="../assets/ibm-logo_3.png" alt="" id="img">
   
    <div class="form" id="filters">
        <ul v-for="(type) in filters" id="items" class="fle-row">
            <span>{{ type.type }}</span>
            <input type="checkbox" name="" id="">
        </ul>
    </div>
   </div>
</template>


<script>

import { useEventBus } from '@/Server/eventBus'

const {emit} = useEventBus()

export default{
    data(){
        return{
            id: '',
            btn:false,
            filters: [{type: 'type', checked: false},{type: 'type', checked: false},{type: 'type', checked: false},
            {type: 'type', checked: false},{type: 'type', checked: false},{type: 'type', checked: false}
            ]
            
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