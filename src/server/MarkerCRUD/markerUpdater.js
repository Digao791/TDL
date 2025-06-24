import L from "leaflet"
import { getPopUpTextFor } from "./Popup/popup_text";

export default function updateMarker(marker){

            let values = marker.options.values
            let symbol = marker.options._symbol

            symbol.setOptions({
                speed: values.Speed,
                direction: values.Course,
            });

            marker.options.icon.options.html = symbol.asSVG();

            if (marker.icon) {
                marker.icon.innerHTML = symbol.asSVG();
            }

            marker.setLatLng([values.Position.Latitude, values.Position.Longitude]);
            values.Speed = values.Speed;
            values.Course = values.Course;

            marker._popup.setContent(getPopUpTextFor(marker.type, values));

            const newIcon = L.divIcon({
                html: symbol.asSVG(),
                className: '',
                iconSize: [symbol.getSize().width, symbol.getSize().height],
                iconAnchor: [symbol.getAnchor().x, symbol.getAnchor().y]
            });

            marker.setIcon(newIcon);
}