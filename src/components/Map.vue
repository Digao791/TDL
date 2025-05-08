<template>
<div class="mapa" id="map" ref="mapa">
</div>
</template>

<script>
import { onMounted, ref } from 'vue';
import socket from '../Server/socketClient';

import 'leaflet'
import 'leaflet-tracksymbol'
import 'leaflet-markers-canvas'
import { latLng } from 'leaflet';
import { map } from 'leaflet';
import { marker } from 'leaflet';
import { popup } from 'leaflet';

let units = []

export default{

    data(){
        return{
            map: '',
            teste: String
        }
    },

    mounted(){
            this.map = map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
            
           
            socket.onmessage = (event) => {
            let unit;
                try{
                    unit = JSON.parse(event.data)
                }catch(e){
                    console.log("String nao convertida, ", e)
                }
                
                units.push(this.addMarker(unit))
                console.log(unit)  
            }
            
    },

    methods:{
        addMarker(unit){
    
           let latlng = latLng(unit['lat'], unit['lng'])
           let trackMarker = L.trackSymbol(latlng, {
                trackId: unit['id'],
                fill: true,
                speed:unit['speed'],
                course: unit['course'],
                heading: unit['heading']
           });

           let popup_config = {
            maxWidth: 100,
            maxHeight: 100
           }

           trackMarker.bindPopup(this.info(trackMarker), popup_config).addTo(this.map)
           
           console.log(trackMarker)
           return trackMarker
        },

        info(track){
            return `<h3>${track._id}</h2><br>
                    <h4>Speed ${track._speed}</h4><br>
                    <h4>Course ${track._course}</h4><br>
                    <h4>Heading ${track._heading}</h4>`
        }
    },

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