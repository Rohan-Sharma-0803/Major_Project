mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
      container: 'map', // container ID
      center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 9 // starting zoom
  });
  const marker = new mapboxgl.Marker({color:"red"})
  .setLngLat(listing.geometry.coordinates) // Listing.geometry.coordinates
  .addTo(map);

   marker.setPopup(
    new mapboxgl.Popup({offset : 35}).setHTML(
      `<h4>${listing.title}</h4><p>exact location will be provided after booking</p>`
    ))

    const geojson = {
      type : 'FeatureCollection',
      features : [
        {
        type : 'Feature',
        geometry : {
          type : 'Point',
          coordinates : listing.geometry.coordinates,
        },
      
    }]
    }
    map.on('load' , function(){
      map.addSource('locations' , {
        type:'geojson',
        data: geojson
      })
      map.addLayer({
        id: 'locations-layer',
        type: 'symbol',
        source: 'locations',
        layout: {
            'icon-image': 'marker-15', // Use the built-in "marker-15" icon
            'icon-size': 5// Optional: adjust size of the icon
        }
    });
    })