
const socket = io()

if (navigator.geolocation) {

    navigator.geolocation.watchPosition((position) => {
        const { latitude: lat, longitude: long } = position.coords;
        console.log(lat, long)
        socket.emit("send-locaion", { lat, long })
    }, (error) => {
        console.log(error)
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    })
}


const map = L.map('map').setView([0, 0], 10)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
}).addTo(map);


// marker icons

const customIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=etRqsBHtSyMZ&format=gif&color=000000',  //
    iconSize: [60, 60],
});

const customCircleMarker = {
    radius: 100,          // Marker size
    fillColor: "red",   // Fill color
    color: "red",      // Border color
    weight: 2,           // Border width
    opacity: 1,
    fillOpacity: 0.8     // Fill opacity
};

const markers = {}

socket.on('get-location', (data) => {
    const { id, lat, long } = data;
    console.log(markers)
    console.log(`data received from ${id}: ${lat} : ${long}`)
    map.setView([lat, long], 16)

    if (markers[id]) {
        markers[id].setLatLng([lat, long])
    } else {

        markers[id] = L.marker([lat, long], { icon: customIcon }).addTo(map)

        map.invalidateSize();
    }
})

socket.on('user-disconnected', (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id])
        delete markers[id]
    }
})