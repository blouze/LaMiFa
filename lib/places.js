matchPlaces = function (position) {
	var places = Places.find({
		location: {
			$near: [position.longitude, position.latitude], 
			$maxDistance: 100
		}
	});
	console.log(_.pluck(places.fetch(), "name"));
	return places;
}