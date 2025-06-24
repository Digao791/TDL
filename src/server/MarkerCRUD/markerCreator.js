import { getCodeMessageFrom } from "../SymbolProcessor/SymbolCodeGenerator";
import { getPopUpTextFor } from "./Popup/popup_text";
import ms from "milsymbol"
import L from "leaflet"
import updateMarker from "./markerUpdater";

function getDefaultConfig() {
    return {
        size: 25,
        strokeWidth: 8,
        infoFields: true,
        fill: false,
    }
}

function getDefaultConfigFor() {
    //TODO
}

function getTypeFrom(data){
    let type = Object.keys(data.Message)[0]
    return type.toString()
}

function getAffiliationFromValues(values){
    return Object.values(values.Identity)[0].toString()
}

function getValuesFrom(data){
    let values = Object.values((data.Message))[0]
    return values
}


export default function createMarkerFrom(data) {

    let type = getTypeFrom(data)
    let values = getValuesFrom(data)
    let Affiliation = getAffiliationFromValues(values)
    let symbol_id = getCodeMessageFrom(type, Affiliation, type.includes("Own"))

    let symbol = new ms.Symbol(symbol_id, getDefaultConfig())

    symbol.setOptions({
        size: 25,
        speed: values.Speed,
        direction: values.Course,
        uniqueDesignation: values.TrackNumberReference ? values.TrackNumberReference : values.TrackNumberSource,
        fill: type.includes("Own") ? true : false,
        location: Object.values(values.Position).toString().toUpperCase()
    })

    let icon = L.divIcon({
        html: symbol.asSVG(),
        className: '',
        iconSize: [symbol.getSize().width, symbol.getSize().height],
        iconAnchor: [symbol.getAnchor().x, symbol.getAnchor().y],
    });

    let latlng = L.latLng(values.Position.Latitude, values.Position.Longitude)

    let marker = L.marker(latlng, {
        icon,
        _symbol: symbol, 
        type: type,
        values
    });

    marker.bindPopup(getPopUpTextFor(type, values), { className: 'popup-marker' })

    return marker

} 