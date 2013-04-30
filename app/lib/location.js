/**
 * This isn't working / implemented yet. I normally wouldn't commit
 * code that isn't working, but this is just a demo. 
 * 
 * Brian Zitzow <bzitzow@gmail.com> 
 * 04/30/2013	
 */
if (Ti.Geolocation.locationServicesEnabled === false) {
	alert("Your device has GPS turned off. Please turn it on.");
}

Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
Ti.Geolocation.purpose = "testing";
Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_LOW;

exports.currentLocation = function(_callbackHandleCoords) {
	
	/**
	 * Titanium API getCurrentPosition()
	 */
	Ti.Geolocation.getCurrentPosition(function(ePosition){	
		
		// Handle Error
		if (ePosition.error) {
			Ti.API.error("Geolocation.getCurrentPosition() failed: " + ePosition.error);
			
			if (_callbackHandleCoords) {
				_callbackHandleCoords(null);
			}
			return null;
		}
		
		// Handle Success
        Ti.App.info('got a location ', JSON.stringify(ePosition));

        // fire and event containing the location information
        Ti.App.fireEvent('location.updated', ePosition.coords);
        
        // execute callback with coordinates as argument
        if (_callbackHandleCoords) {
            _callbackHandleCoords(ePosition.coords);
        }	
	});
}