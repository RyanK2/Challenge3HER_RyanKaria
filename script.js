var input = document.querySelector('.input_text');
var main = document.querySelector('#city');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbmsyIiwiYSI6ImNrbjRsMndnODA3dDMycG9mbG81ZGFreTkifQ.CmIG8_o3Fm-TEAQQtRzZIA';


//Request Map from mapbox
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [4.324411956909255, 52.06725459964508]
});

//Markers. Primary Location: HHS
var marker1 = new mapboxgl.Marker({ color: 'blue'})
.setLngLat([4.324411956909255, 52.06725459964508])
.setPopup(new mapboxgl.Popup().setHTML("<h3>Landingsplek: De Haagse Hogeschool</h3><img src=images/HHS.jpg>"))
.addTo(map);
 
var marker2 = new mapboxgl.Marker({ color: 'green'})
.setLngLat([-95.08931224450774, 29.558276500196694])
.setPopup(new mapboxgl.Popup().setHTML("<h3>Landingsplek: NASA Control Center</h3><img src=images/NASA.jpg>"))
.addTo(map);

var marker3 = new mapboxgl.Marker({ color: 'yellow'})
.setLngLat([-80.64738357905837, 28.575647909563365])
.setPopup(new mapboxgl.Popup().setHTML("<h3>Landingsplek: Kennedy Space Center</h3><img src=images/KSC.jpg>"))
.addTo(map);

var marker4 = new mapboxgl.Marker({ color: 'orange'})
.setLngLat([-106.49079025797874, 32.38248410739619])
.setPopup(new mapboxgl.Popup().setHTML("<h3>Landingsplek: White Sands</h3><img src=images/WhiteSands.jpg>"))
.addTo(map);

var marker5 = new mapboxgl.Marker({ color: 'red'})
.setLngLat([-117.89471421160711, 34.92449762674656])
.setPopup(new mapboxgl.Popup().setHTML("<h3>Landingsplek: Edwards Air Force Base</h3><img src=images/EAF.jpg>"))
.addTo(map);

var coordinatesGeocoder = function (query) {
// Match anything which looks like
// decimal degrees coordinate pair.
var matches = query.match(
/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
);
if (!matches) {
return null;
}
 
function coordinateFeature(lng, lat) {
return {
//Go to location and place a marker
center: [lng, lat],
geometry: {
type: 'Point',
coordinates: [lng, lat]
},
place_name: 'Lat: ' + lat + ' Lng: ' + lng,
place_type: ['coordinate'],
properties: {},
type: 'Feature'
};
}
 
var coord1 = Number(matches[1]);
var coord2 = Number(matches[2]);
var geocodes = [];
 
if (coord1 < -90 || coord1 > 90) {
// must be lng, lat
geocodes.push(coordinateFeature(coord1, coord2));
}
 
if (coord2 < -90 || coord2 > 90) {
// must be lat, lng
geocodes.push(coordinateFeature(coord2, coord1));
}
 
if (geocodes.length === 0) {
// else could be either lng, lat or lat, lng
geocodes.push(coordinateFeature(coord1, coord2));
geocodes.push(coordinateFeature(coord2, coord1));
}
 
return geocodes;
};
 
// Add the control to the map.
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
localGeocoder: coordinatesGeocoder,
zoom: 14,
placeholder: 'Locate: (ex: -40, 170)',
mapboxgl: mapboxgl
})
);

//Call to API Key
const api = {
  key: "e86e6d34a8a2d9c6709644754ce41d91",
  url: "https://api.openweathermap.org/data/2.5/"
}

//AddEventListeners to searchbar and button
const searchbox = document.querySelector('.input_text');
const submit = document.querySelector('.submit');
searchbox.addEventListener('keypress', setQuery);
submit.addEventListener('click', setQuery);

function setQuery(evt) {
	if (evt.keyCode == 13) {
	getResults(searchbox.value);
	}
}

function getResults (query) {
	fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
    return weather.json();
    }).then(displayResults);
}

//Request Results from API
function displayResults (weather) {
	let city = document.querySelector('.name');
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector('.date');
	date.innerText = dates(now);

	let temp = document.querySelector('.temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

	let cloudy = document.querySelector('.clouds');
	cloudy.innerText = weather.weather[0].main;

	let average = document.querySelector('.desc');
	average.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

//Current Date
function dates (d) {
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}

