var map, marker, circle, search;


initMap = function (options) {

	if (map) 
		map.remove();

	map = L.map("map", options);

	L.tileLayer("http://{s}.tile.cloudmade.com/f7b77bd9f6584e4b855d17ab4b981560/997/256/{z}/{x}/{y}.png", {
		//attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18, 
	}).addTo(map);

	if (options.search) {
		search = new L.Control.GeoSearch({
			showMarker: false, 
			provider: new L.GeoSearch.Provider.Esri(), 
			searchLabel: "Rechercher...", 
			notFoundMessage: "Désolé, pas de résultats pour cette adresse"
		}).addTo(map);

		map.on("geosearch_foundlocations", function (loc) {
			var location = loc.Locations[0];
			//console.log(location);
			Session.set("mapSearchLocation", location);
			if (circle) 
				circle.setLatLng(location);
		});
	}
}


mapLocate = function () {
	
	map.locate({
		setView: true, 
		maxZoom: 12, 
		timeout: 1000
	});
}


markLocation = function (location) {

	if (!location)
		return;

	if (marker) 
		map.removeLayer(marker);

	marker = L.marker([location.Y, location.X]).addTo(map);

	if (location.Label) {

		setTimeout(function () {
			marker.bindPopup(location.Label).openPopup();
		}, 500);

	}

	var zoomLevel = (location.Label && _(location.Label).strRightBack(", ") == "France") ? 10 : 16;

	map.setView([location.Y, location.X], zoomLevel, {reset: false});
}


markMobility = function (mobility) {

	if (circle) 
		map.removeLayer(circle);

	circle = L.circle(marker.getLatLng(), mobility * 1000, {
		stroke: true, 
		weight: 1, 
		color: "#00a", 
		fillOpacity: 0.1
	}).addTo(map);

	map.fitBounds(circle.getBounds().pad(-0.15));
}


updateMobility = function (mobility) {

	circle.setRadius(mobility * 1000);
	map.fitBounds(circle.getBounds().pad(-0.1));
}