mapboxgl.accessToken = 'pk.eyJ1IjoianN3ZWxzaCIsImEiOiJjazFqdXczOHYyNWNxM25udDE4bGh3cGozIn0.8uyxIS9Zv3y_QwVnwltlVg';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-123.081, 49.205],
      zoom: 10.60      
    });
    
map.on('load', function() {
  map.addSource('trees', {
    type: 'geojson',
    data: './trees.geojson'
  });
});
map.on('click', 'trees-point', function(e) {
  console.log(e)
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML('<b>Height Range ID:</b> ' + e.features[0].properties.height_range_id)
    .addTo(map);
});
