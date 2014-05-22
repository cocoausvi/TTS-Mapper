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

	// alert(url);

	$.getJSON(url, {}, function (data) {
		// notice that the data can be accessed like a multi-dimensional array
		list = data['response']['venues'];
		for (var i = 0; i < list.length; i++) {
			var venue = list[i];

			// create the icon for the map
			var id = venue['id'];
			var lat = venue['location']['lat'];
			var lng = venue['location']['lng'];

			if (venue['categories'].length === 0)
				continue;

			var category = venue['categories'][0];
			var path = category['icon'].prefix + "32" + category['icon'].suffix;
			var newIcon = CreateIcon(path, '');

			var marker = AddMapMarker(id, lat, lng, path, newIcon);
		
			var name = venue['name'];
			var html = '<h2>' + name + '</h2>';

			if (typeof venue['contact']['phone'] != "undefined") {
				html += '<div class="item"><a href="tel:' + venue['contact']['phone'] + '">' + venue['contact']['formattedPhone'] + '</a></div>';
			}

			html += '<div class="item">Type: ' + category['shortName'] + '</div>';

			if (typeof venue['menu'] != "undefined") {
				var menuLink = venue['menu'].url;
				html += '<div class="item"><a href="' + menuLink + '">View Menu</a></div>';
			}

			html += SetupTwilioText(id, name);

			marker.bindPopup(html);
			_group.addLayer(marker);

		}

		SetupTwilioEvents();
	});
}

function AddMapMarker(id, lat, lng, path, icon) {
	var latLng = new L.LatLng(lat, lng);
	var marker = new L.Marker(latLng, { icon: icon });

	_group.addLayer(marker);

	return marker;
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

function CreateIcon(iconPath, className) {
	var icon = L.icon({
		iconUrl: iconPath,
		shadowUrl: null,
		iconSize: new L.Point(44, 55),
		//iconAnchor: new L.Point(16, 41),
		popupAnchor: new L.Point(0, -31),
		className: className
	});

	return icon;
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

function SendText(txt, name){
	$.ajax({
		url: '/main/sendtext',
		type: 'POST',
		data: { text: txt, name: name }
	}).done(function(data){
		if (data === null)
			alert('BAD!');
		else {
			$('.txtTextMessage').val('');//resets value of text box to empty
			$('.leaflet-popup').css('opacity', 0); //make the pop-up invisible
		}
	});
}

function SetupTwilioEvents(){
	$('body').on('keypress', '.txtTextMessage', function(e){
		if (e.keyCode == 13) {
			var txt = $(this).val();
			var name = $(this).parent().find('.hdnName').val();
			SendText(txt, name);
		}
	});

	$('body').on('click', '.btnSendText', function(){
		var txt = $(this).parent().find('.txtTextMessage').val();
		var name = $(this).parent().find('.hdnName').val();
		SendText(txt, name);
	});
}

function SetupTwilioText(id, name){
	var html = '<input type="hidden" class="hdnID" value="' + id + '" />';
	html += '<input type="hidden" class="hdnName" value="' + name + '" />';
	html += '<input type="text" class="txtTextMessage" placeholder="Text your friend!" />';
	html += '<button class="btnSendText">Send</button>';

	return html;
}

