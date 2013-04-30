var url = "http://api.wunderground.com/api/b583fab1107ec082/conditions/q/38.794900,-121.269331.json";
var json;

$.weather.text = "Weather Status Here";
$.tempature.text = "Tempature: ";
$.time.text = "Time Here";

var xhr = Ti.Network.createHTTPClient({
    onload: function() {
		json = JSON.parse(this.responseText);
		$.image.image = json.current_observation.icon_url;
		$.weather.text = json.current_observation.weather;
		$.tempature.text = "Tempature: " + json.current_observation.temp_f;
		$.time.text = json.current_observation.observation_time 
	},
    onerror: function(e) {
		Ti.API.debug("STATUS: " + this.status);
		Ti.API.debug("TEXT:   " + this.responseText);
		Ti.API.debug("ERROR:  " + e.error);
		alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:5000
});

xhr.open("GET", url);
xhr.send();

$.index.open();
