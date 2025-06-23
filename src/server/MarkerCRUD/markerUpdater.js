import L from "leaflet"
import { getPopUpTextFor } from "./Popup/popup_text";

export default function updateMarker(marker){

            marker.options._symbol.setOptions({
                speed: marker.options.speed,
                direction: marker.options.course,
            });

            marker.options.icon.options.html = marker.options._symbol.asSVG();

            if (marker._icon) {
                marker._icon.innerHTML = marker.options._symbol.asSVG();
            }

            marker.setLatLng([marker._latlng.lat, marker._latlng.lng]);
            marker.options.speed = marker.options.speed;
            marker.options.course = marker.options.course;

            marker._popup.setContent(getPopUpTextFor(marker));

            const newIcon = L.divIcon({
                html: marker.options._symbol.asSVG(),
                className: '',
                iconSize: [marker.options._symbol.getSize().width, marker.options._symbol.getSize().height],
                iconAnchor: [marker.options._symbol.getAnchor().x, marker.options._symbol.getAnchor().y]
            });

            marker.setIcon(newIcon);
}