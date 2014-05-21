var _userLocation;
var _map;
var _group;
$(document).ready(function(){
	var url = location.pathname.substring(location.pathname.lastIndexOf('/')+1); //goes to last slash and then goes to the end of the string but the +1 starts after the slash
	if (url == 'map') {
		LoadMapPage();
	}

	else {
		LoadHomePage();
	}
});

function LoadMapPage() {

	// var map = L.map('map');

	// L.tileLayer('http://{s}.tiles.mapbox.com/v3/cocoausvi.i9gbb58j/{z}/{x}/{y}.png', {
 //    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
 //    maxZoom: 18
	// }).addTo(map);

	// map.setView([51.505, -0.09], 14); //The last number is the zoom

	// var marker = L.marker([51.5, -0.09]).addTo(map);

	// var circle = L.circle([51.508, -0.11], 500, {
	//     color: 'red',
	//     fillColor: '#f03',
	//     fillOpacity: 0.5
	// }).addTo(map);

	// var polygon = L.polygon([
	//     [51.509, -0.08],
	//     [51.503, -0.06],
	//     [51.51, -0.047]
	// ]).addTo(map);

	// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
	// circle.bindPopup("I am a circle.");
	// polygon.bindPopup("I am a polygon.");

	// var popup = L.popup()
 //    .setLatLng([51.5, -0.09])
 //    .setContent("I am a standalone popup.")
 //    .openOn(map);

 //    function onMapClick(e) {
 //    alert("You clicked the map at " + e.latlng);
	// }
	// map.on('click', onMapClick);

	// var popup = L.popup();

	// function onMapClick(e) {
 //    	popup
	//         .setLatLng(e.latlng)
	//         .setContent("You clicked the map at " + e.latlng.toString())
	//         .openOn(map);
	// }

	// map.on('click', onMapClick);

	InitLocation();

	$('#txtSearch').keypress(function(e){
		if (e.keyCode == 13)
		SearchFoursquare();
	});

}

function SearchFoursquare() {
	_group.clearLayers();

	var query = $('#txtSearch').val();

	var url = 'https://api.foursquare.com/v2/venues/search?'
	url += 'll=' + _userLocation[0] + ','+ _userLocation[1]; //calling the 0 and 1 index of the longitude, lattitude array
	url += '&radius=10000';
	url += '&intent=browse';
	url += '&query=' + query;
	url += '&client_id=LDGDIX0UIXHVSTF5TJNVVOYSLTO4PBLTN43LPPTTAZXL1T3G';
	url += '&client_secret=Q14U4GKL101NK2EH1M2T4U00FXFSX0M0YH4ZFHXELA3GX2TH';
	url += '&v=20130815';	

	alert(url);
}


function InitLocation(){
	_map = L.map('map');
	_group = new L.LayerGroup(); //need to add a layer so that your pins can be in one group and easier to add and remove		_map.addLayer(_group);
	_map.addLayer(_group);

	L.tileLayer('http://{s}.tiles.mapbox.com/v3/cocoausvi.i9gbb58j/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18
	}).addTo(_map);

	var gl = navigator.geolocation;
	gl.getCurrentPosition(geoSuccess, geoError);

}

function geoSuccess(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	_userLocation = [latitude, longitude];
	_map.setView(_userLocation, 16);

	var marker = L.marker(_userLocation).addTo(_group);
}

function geoError(err) {
	if (err.code === 0)
		alert('App is not working.  We are hard at work to fix it.  Please try again later.')
	else if (err.code === 1)
		alert('Location access has been denied.')
	else if (err.code === 2)
		alert('Could not find your location.  Please try again later.')
	else if (err.code === 3)
		alert('It is taking too long to find your location.  Where the hell are you??')
}	

		

function LoadHomePage(){

}

