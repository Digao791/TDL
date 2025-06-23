import { getCodeMessageFrom } from "../SymbolProcessor/SymbolCodeGenerator";
import { getPopUpTextFor } from "./Popup/popup_text";
import ms from "milsymbol"
import L from "leaflet"

function getDefaultConfig() {
    return {
        size: 25,
        strokeWidth: 8,
        infoFields: true,
        fill: false
    }
}

function getDefaultConfigFor(){
    //TODO
}

export default function createMarkerFrom(data) {

    let symbol_id = getCodeMessageFrom(data)

    let symbol = new ms.Symbol(symbol_id, getDefaultConfig())
    
    symbol.setOptions({
        size: 25,
        speed: data['speed'],
        direction: data['course'],
        uniqueDesignation: data['trackNumberReference'].toString(),
        fill: data['name'].toString().includes("Own") ? true : false,
    })

    let icon = L.divIcon({
        html: symbol.asSVG(),
        className: '',
        iconSize: [symbol.getSize().width, symbol.getSize().height],
        iconAnchor: [symbol.getAnchor().x, symbol.getAnchor().y],
    });

    let latlng = L.latLng(data['lat'], data['lng'])

    let marker = L.marker(latlng, {
        icon,
        _symbol: symbol,
        id: data['id'],
        type: data['type'],
        speed: data['speed'],
        course: data['course'],
        identity: data['identity'],
        name: data['name'],
        trackNumberSource: data['trackNumberSource'],
        trackNumberReference: data['trackNumberReference']
    });

    marker.bindPopup(getPopUpTextFor(marker), { className: 'popup-marker' })

    return marker

} 