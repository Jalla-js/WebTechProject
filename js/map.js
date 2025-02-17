var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    minZoom: 3 
}).addTo(map);
map.zoomControl.setPosition('bottomright');

var PinIcon = L.icon({
    iconUrl: 'Pin.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

L.marker([53.222467, -4.130392], {
    icon: PinIcon
}).addTo(map).bindPopup('A pretty CSS popup.<br> Easily customizable.')