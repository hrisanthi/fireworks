<script>
/*
* Click the map to set a new location for the Street View camera.
*/

var map;
var fayetteville = new google.maps.LatLng(35.052664, -78.878358);
var sv = new google.maps.StreetViewService();

var panorama;

function initialize() {

panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

// Set up the map
var mapOptions = {
center: fayetteville,
zoom: 12,
streetViewControl: false
};
map = new google.maps.Map(document.getElementById('map-canvas'),
  mapOptions);

// Set the initial Street View camera to the center of the map
sv.getPanoramaByLocation(fayetteville, 50, processSVData);

// Look for a nearby Street View panorama when the map is clicked.
// getPanoramaByLocation will return the nearest pano when the
// given radius is 50 meters or less.
google.maps.event.addListener(map, 'click', function(event) {
  sv.getPanoramaByLocation(event.latLng, 50, processSVData);
});
}

function processSVData(data, status) {
if (status == google.maps.StreetViewStatus.OK) {
var marker = new google.maps.Marker({
  position: data.location.latLng,
  map: map,
  title: data.location.description
});

panorama.setPano(data.location.pano);
panorama.setPov({
  heading: 270,
  pitch: 0
});
panorama.setVisible(true);

google.maps.event.addListener(marker, 'click', function() {

  var markerPanoID = data.location.pano;
  // Set the Pano to use the passed panoID
  panorama.setPano(markerPanoID);
  panorama.setPov({
    heading: 270,
    pitch: 0
  });
  panorama.setVisible(true);
});
} else {
alert('Street View data not found for this location.');
}
}

google.maps.event.addDomListener(window, 'load', initialize);

</script>
