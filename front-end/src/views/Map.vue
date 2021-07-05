<template>
<v-app>
  <div>
    <div id="menu mt-15 d-none">
    <div class="d-flex justify-center d-none mt-15 pt-5 pb-3 mr-5 text-capitalize text-center">
      <div v-for="(style,i) in styles" :key="i">
        <div class="mr-2">
        <input :id="style.id" :type="style.type" name="rtoggle" :value="style.value" />
        <label class="font-weight-bold text-h6" :for="style.id">{{style.value}}</label>
        </div>
      </div>

    </div>
    </div>
    <!-- the map -->
    <div>
      <v-row>
        <v-col cols='11' style="overflow: hidden;" md="11" sm='11'>
     <div id="mapContainer" class="basemap"></div>

        </v-col>
      </v-row>

    </div>

  </div>

</v-app>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiYW1tYXJsZWUxNiIsImEiOiJja2hubnF1b2wwMWhxMnNwNXc0azV6ZnpkIn0.c_fzU8XDuRRKLO51vvBM1g',
      santo: false,
      styles:[
  {id:"streets-v11",type:'radio',name:'rtoggle',value:"streets"},
  {id:"light-v10",type:'radio',name:'rtoggle',value:"light"},
  {id:"dark-v11",type:'radio',name:'rtoggle',value:"dark"},
  {id:"outdoors-v11",type:'radio',name:'rtoggle',value:"outdoors"},
  {id:"satellite-v9",type:'radio',name:'rtoggle',value:"satellite"},
  ]
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

   const map =  new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [47.718809, 29.319598],
      zoom: 4,
      pitch: 60,
      bearing: -60,
      // maxBounds: [
      //   [103.6, 1.1704753],
      //   [104.1, 1.4754753],
      // ],
    });
    var nav = new mapboxgl.NavigationControl();
      map.addControl(nav, 'top-right')
       new mapboxgl.Popup({ closeOnClick: false })
          
           new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat([40.003696, 40.261594])
          .setHTML('<h1>new branch !</h1>')
          .addTo(map);
          
           
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
 
function switchLayer(layer) {
var layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
}
 
for (var i = 0; i < inputs.length; i++) {
inputs[i].onclick = switchLayer;
}
          map.on('load', function () {
// Add an image to use as a custom marker
map.loadImage(
'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
function (error, image) {
if (error) throw error;
map.addImage('custom-marker', image);
// Add a GeoJSON source with 2 points
map.addSource('points',
 {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': [
{
// feature for Mapbox DC
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [31.206976780397856,30.022857474969623]
},
'properties': {
'title': 'EGYPT'
}
},
{
// feature for Mapbox SF
'type': 'Feature',

'geometry': {
'type': 'Point',
'coordinates': [47.718809, 29.319598]  
},
'properties': {
'title': 'moonLight'
}
},
{
// feature for Mapbox SF
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [47.70720030622162, 29.330230446908107]

},
'properties': {
'title': 'main'
}
}
,
{
// feature for Mapbox SF
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [ -102.28615317797728,21.86023132986236]

},
'properties': {
'title': 'new'
}
}
,
{
// feature for Mapbox SF
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [ 47.718809,29.319598]

},
'properties': {
'title': 'away'
}
}


  ]
}
});
 
// Add a symbol layer
map.addLayer({
'id': 'points',
'type': 'symbol',
'source': 'points',
'layout': {
'icon-image': 'custom-marker',
// get the title name from the source's "title" property
'text-field': ['get', 'title'],
'text-font': [
'Open Sans Semibold',
'Arial Unicode MS Bold'
],
'text-offset': [0, 1.25],
'text-anchor': 'top'
}
});
}
);
});
  },
  
};
</script>
<style lang="scss" scoped>
.basemap {
  width: 800px;
  height: 500px;
  margin: 20px auto;

}
</style>