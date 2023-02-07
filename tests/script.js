mapboxgl.accessToken = 'pk.eyJ1IjoibmdxYXphLWciLCJhIjoiY2wwZ2xxZW44MDZ3MjNrcTh5b2ZzZmtvbSJ9.vLOYAuYYOkjq-uCI7d5tQA';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: [28.58333, -20.15 ], // starting position [lng, lat]
zoom: 9, // starting zoom
projection: 'globe'
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
// Create a new marker.
const marker = new mapboxgl.Marker()
    .setLngLat([30.5, 50.5])
    .addTo(map);
