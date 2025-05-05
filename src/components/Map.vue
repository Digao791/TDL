<template>
<div class="mapa" id="map">
</div>
</template>

<script>
import { Map } from 'leaflet';
import { onMounted } from 'vue';
import socket from '../Server/socketClient';
import { getUnits } from '@/store/store';
export default{

    data(){
        return{
            map: Map,
            teste: String
        }
    },

    mounted(){
            this.map = L.map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            socket.addEventListener("message", (event) => {
                console.log(getUnits())
                /*
                try{
                    let temp = getUnits()
                    let x = temp['x']
                    let y = temp['y']

                    L.marker([x,y]).addTo(this.map)
                }catch(error){
                    console.log(error)
                }
                */
            })
    },

    methods:{
        addMarker(){
            L.marker([51.5, -0.09]).addTo(this.map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            .openPopup()
        }
    }

}

</script>

<style>
#map{
    display: block;
    position: relative;
    top: 2%;
    bottom: 1px;
    width: 100%;
    height: 90%;
}

</style>