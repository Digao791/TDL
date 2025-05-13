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
import { latLng, map, marker, popup } from 'leaflet';
import { useEventBus } from '@/Server/eventBus';


const units = new Map()

const {on} = useEventBus()

export default{

    data(){
        return{
            map: ''
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

                if(units[unit['id']]) this.updateUnit(unit)
                else units[unit['id']] = this.addMarker(unit)
            }

            on('_id', (data) => {
                this.show(units[data])
            })
            
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
            maxWidth: 500,
            maxHeight: 500,
            className: "popup"
           }

           trackMarker.bindPopup(this.info(trackMarker), popup_config).addTo(this.map)
           
           return trackMarker
        },

        updateUnit(unit){            

            let target_id = unit['id']

            units[target_id].setLatLng(latLng(unit['lat'], unit['lng']))
            units[target_id].setSpeed(unit['speed'])
            units[target_id].setCourse(unit['course'])
            units[target_id]._popup.setContent(this.info(units[target_id]))
            console.log("unit is updated", units[target_id])
        },

        info(track){
            return `<h3 class='titleId'>${track._id}</h3>
                    <img src="../assets/ship.png" class='img'>
                    <p>Lat ${track._latlng.lat} Lng ${track._latlng.lng} <p>
                    <p>Speed ${track._speed}</p>
                    <p>Course ${track._course}</p>
                    <p>Heading ${track._heading}</p>`
        },

        show(unit){
            this.map.setView([unit._latlng.lat, unit._latlng.lng], 10)
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

.popup .leaflet-popup-content-wrapper{
    width: 200px;
    height: 300px;
    background-color: whitesmoke;
    font-size: 12px;
    border-radius: 1px;
    line-height: 24px;
    text-align: center;
}

.popup .titleId{
    
}

.popup .img{
   width: 100px;
   height: 100px;
   content: url("../assets/ship.png");
}

</style>