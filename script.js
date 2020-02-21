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
        map.addLayer({
          id: 'trees-heat',
          type: 'heatmap',
          source: 'trees',
          maxzoom: 15,
          paint: {
            // increase weight as diameter breast height increases
            'heatmap-weight': {
              property: 'height_range_id',
              type: 'exponential',
              stops: [
                [0,0],
                [10,1]
              ]
            },
            // increase intensity as zoom level increases
            'heatmap-intensity': {
              stops: [
                [11, 1],
                [15, 3]
              ]
            },
            // assign color values be applied to points depending on their density
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(236,222,239,0)',
              0.2, 'rgb(208,209,230)',
              0.4, 'rgb(166,189,219)',
              0.6, 'rgb(103,169,207)',
              0.8, 'rgb(28,144,153)'
            ],
            // increase radius as zoom increases
            'heatmap-radius': {
              stops: [
                [11, 15],
                [15, 20]
              ]
            },
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
              default: 1,
              stops: [
                [14, 1],
                [15, 0]
              ]
            },
          }
        }, 'waterway-label');

        map.addLayer({
          id: 'trees-point',
          type: 'circle',
          source: 'trees',
          minzoom: 14,
          paint: {
            // increase the radius of the circle as the zoom level and HEIGHT_RANGE_ID value increases
            'circle-radius': {
              property: 'height_range_id',
              type: 'exponential',
              stops: [
                [{ zoom: 15, value: 0 }, 5],
                [{ zoom: 15, value: 10 }, 10],
                [{ zoom: 22, value: 0 }, 20],
                [{ zoom: 22, value: 10 }, 50],
              ]
            },
            'circle-color': {
              property: 'height_range_id',
              type: 'exponential',
              stops: [
                [0, 'rgba(236,222,239,0)'],
                [1, 'rgb(236,222,239)'],
                [2, 'rgb(208,209,230)'],
                [4, 'rgb(166,189,219)'],
                [6, 'rgb(50,50,50)'],
                [8, 'rgb(28,144,153)'],
                [10, 'rgb(1,108,89)']
              ]
            },
            'circle-stroke-color': 'blue',
            'circle-stroke-width': 1,
            'circle-opacity': {
              stops: [
                [14, 0],
                [15, 1]
              ]
            }
          }
        }, 'waterway-label');
        });

map.on('click', 'trees-point', function(e) {
  console.log(e)
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML('<b>Height Range ID:</b> ' + e.features[0].properties.height_range_id)
    .addTo(map);
});
