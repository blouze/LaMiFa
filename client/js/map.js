var map, marker, circle, search;


initMap = function (options) {

	if (map) {
		map.remove();
		marker = null;
		circle = null;
	}

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
			console.log(location);
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


updatePosition = function (location) {
	if (!marker) 
		markLocation(location);
	else
		marker.setLatLng([location.Y, location.X]);

	//map.setView([location.Y, location.X]);
}


markLocation = function (location) {

	if (!location)
		return;

	marker = L.marker([location.Y, location.X]).addTo(map);

	if (location.Label) {

		setTimeout(function () {
			marker.bindPopup(location.Label).openPopup();
		}, 500);

	}
}


updateMobility = function (mobility) {
	if (!circle) 
		markMobility(mobility);
	else
		circle.setRadius(mobility);

	map.fitBounds(circle.getBounds().pad(-0.1));
}


markMobility = function (mobility) {
	if (!marker)
		return;

	circle = L.circle(marker.getLatLng(), mobility, {
		stroke: true, 
		weight: 1, 
		color: "#00a", 
		fillOpacity: 0.1
	}).addTo(map);
}