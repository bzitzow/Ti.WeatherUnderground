function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        image: ""
    });
    $.__views.index.add($.__views.image);
    $.__views.weather = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#900",
        id: "weather",
        shadowColor: "#aaa",
        text: "weather",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "30"
    });
    $.__views.index.add($.__views.weather);
    $.__views.tempature = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "blue",
        id: "tempature",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "50"
    });
    $.__views.index.add($.__views.tempature);
    $.__views.time = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        id: "time",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "70"
    });
    $.__views.index.add($.__views.time);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var url = "http://api.wunderground.com/api/b583fab1107ec082/conditions/q/38.794900,-121.269331.json";
    var json;
    $.image.image = "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif";
    $.weather.text = "Weather Status Here";
    $.tempature.text = "Tempature: ";
    $.time.text = "Time Here";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            json = JSON.parse(this.responseText);
            $.image.image = json.current_observation.icon_url;
            $.weather.text = json.current_observation.weather;
            $.tempature.text = "Tempature: " + json.current_observation.temp_f;
            $.time.text = json.current_observation.observation_time;
        },
        onerror: function(e) {
            Ti.API.debug("STATUS: " + this.status);
            Ti.API.debug("TEXT:   " + this.responseText);
            Ti.API.debug("ERROR:  " + e.error);
            alert("There was an error retrieving the remote data. Try again.");
        },
        timeout: 5e3
    });
    xhr.open("GET", url);
    xhr.send();
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;