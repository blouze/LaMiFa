var map, marker, markers, circle, search;


initMap = function (options) {
	if (map) {
		map.remove();
		marker = null;
		circle = null;
		search = null;
	}

	map = L.map("map", options);

	L.tileLayer("http://{s}.tile.cloudmade.com/f7b77bd9f6584e4b855d17ab4b981560/997/256/{z}/{x}/{y}.png", {
		//attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18, 
	}).addTo(map);

	markers = new L.MarkerClusterGroup({
		maxClusterRadius: 20
	});
	map.addLayer(markers);

	if (options) {
		if (options.search) {
			search = new L.Control.GeoSearch({
				showMarker: false, 
				provider: new L.GeoSearch.Provider.Esri(), 
				searchLabel: "Rechercher...", 
				notFoundMessage: "Désolé, pas de résultats pour cette adresse"
			}).addTo(map);

			if (options.search.callback) {
				map.on("geosearch_foundlocations", function (loc) {
					options.search.callback.call(map, loc.Locations[0]);
					var location = loc.Locations[0];
					updatePosition(location);
					if (location.Label) {
						setTimeout(function () {
							marker.bindPopup(location.Label).openPopup();
						}, 500);
					}
				});
			}

			if (options.search.query) {
				search.geosearch(options.search.query);
			}
		}

		if (options.onZoomEnd) {
			map.on("zoomend", function (e) {
				options.onZoomEnd.call(map, e);
			});
		}
	}
}


updatePosition = function (location) {
	if (!marker) 
		markPosition(location);

	marker.setLatLng([location.Y, location.X]);
	if (circle) 
		map.fitBounds(circle.getBounds().pad(-0.1));
}


markPosition = function (location) {
	if (!map)
		return;

	var greenMarker = L.AwesomeMarkers.icon({
		icon: 'user',
		markerColor: 'green'
	});

	if (marker) 
		map.removeLayer(marker);

	marker = L.marker([location.Y, location.X], {icon: greenMarker}).addTo(map);
}


updateLocations = function (locations) {
	if (!map)
		return;

	markers.clearLayers();

	if (locations) {
		for (var i = locations.length - 1; i >= 0; i--) {
			markers.addLayer(new L.Marker([locations[i].location[1], locations[i].location[0]]).bindPopup(locations[i].name));
		};
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