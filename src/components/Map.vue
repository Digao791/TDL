<template>
<div class="mapa" id="map">
</div>
</template>

<script>
import { Map } from 'leaflet';
import { onMounted } from 'vue';
import socket from '../Server/socketClient';

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

            socket.onmessage = (event) => {
                console.log(event.data)
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