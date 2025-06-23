<template>
    <div class="" id="map" ref="mapa"></div>
</template>

<script>
import socket from '../server/socketClient';

import 'leaflet'
import 'leaflet-tracksymbol'
import 'leaflet-markers-canvas'
import L, { Bounds, latLngBounds } from 'leaflet';
import { useEventBus } from '@/server/eventBus';
import test_unit from "../server/test_unit.json"
import createMarkerFrom from '@/server/MarkerCRUD/markerCreator';
import updateMarker from '@/server/MarkerCRUD/markerUpdater';


const { on } = useEventBus()
const address = () => fetch('http://0.0.0.0:8080/map').then(response => response.json()).then(
    value => value.map
)

const units = new Map()
const southWest = L.latLng(-85, -180);
const northEast = L.latLng(85, 180);


export default {

    props: ["filters"],

    data() {
        return {
            map: '',
        }
    },

    mounted() {
        this.map = L.map('map', {
            minZoom: 3,
            maxZoom: 8,
            maxBoundsViscosity: 1.0,
            worldCopyJump: false
        }).setView([0, 0], 0);

        const bounds = L.latLngBounds(southWest, northEast);
        this.map.setMaxBounds(bounds)

        address().then(mapUrl => {
            L.tileLayer(mapUrl, {
                tileSize: 512,
                zoomOffset: -1,
                minZoom: 1,
                maxZoom: 8,
                Style: null,
                attribution: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
                crossOrigin: true
            }).addTo(this.map);
        })

        socket.onmessage = (event) => {
            let unit;
            try {
                unit = JSON.parse(event.data)
            } catch (e) {
                console.log("String not converted, ", e)
            }

            if (units.get(unit.trackNumberReference)) {
                updateMarker(units.get(unit.trackNumberReference))
            }
            else {
                let marker = createMarkerFrom(unit).addTo(this.map)
                units.set(unit.trackNumberReference, marker)
                this.$emit('unit', Array.from(units.entries()))
            }
        }

        on('_id', (data) => {
            let target = Number(data)
            this.show(units.get(target))
        })

        //this.doATest()
    },

    watch: {
        filters: {
            handler(filters) {
                this.setFilters(filters);
            },
            deep: true
        },
    },

    methods: {

        show(unit) {
            if (unit == null) console.log("Not found")
            else this.map.setView([unit._latlng.lat, unit._latlng.lng], 7)
        },

        setFilters(filters) {
            units.forEach(unit => {

            const unitAffiliation = unit.options._symbol.metadata.affiliation
            const unitEnvironment = unit.options._symbol.metadata.baseDimension
           
            const matchesAffiliation = !filters.selectedAffiliation || unitAffiliation === filters.selectedAffiliation;
            const matchesEnvironment =
                filters.selectedEnvironment.length === 0 || filters.selectedEnvironment.includes(unitEnvironment);

            if (matchesAffiliation && matchesEnvironment) {
                if (!this.map.hasLayer(unit)) this.map.addLayer(unit);
            } else {
                if (this.map.hasLayer(unit)) this.map.removeLayer(unit);
            }
        })
        },
        doATest() {
            test_unit.forEach(element => {
                let marker = createMarkerFrom(element).addTo(this.map)
                units.set(element.trackNumberReference, marker)
                this.$emit('unit', Array.from(units.entries()))
            });

            // setInterval(() => {
            //     units.forEach((unit) => {
            //         console.log(unit.name)
            //         unit.options.speed += 10;
            //         unit._latlng.lat += 10.5;
            //         unit._latlng.lng = 10.5;
            //         updateMarker(unit)})
            // }, 5000)    
        }
    }
}


</script>

<style>
#map {
    display: block;
    position: absolute;
    bottom: 1px;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.popup-marker .leaflet-popup-content-wrapper {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(1px);
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: auto;
    max-width: 250px;
    padding: 10px;
}

.popup-marker .leaflet-popup-content {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.milsymbol-icon svg{
    size: 10px;
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
}
</style>