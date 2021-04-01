var myMap;
var input = document.querySelector('.input_text');
var main = document.querySelector('#city');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');

function initMap() {

	var mapOptions = {
		center: {
			lat: 52.067514882683064, 
			lng: 4.3238686164587
		},
		zoom: 15,
	};

	myMap = new google.maps.Map(document.getElementById('map'), mapOptions);

	var hhsMarker = new google.maps.Marker({
		position: {
			lat: 52.0673,
			lng: 4.3241,
		},
		map: myMap,
		title: 'de Haagse Hogeschool'
	});

}

button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=50a7aa80fa492fa92e874d23ad061374&units=metric')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = descValue;
  temp.innerHTML = tempValue + ' ºC';
  input.value = "";

})

.catch(err => alert("This city doesn't exist. (Control the spelling)"));
})
