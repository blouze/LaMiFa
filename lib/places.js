matchPlace = function (position) {
	var place = Places.findOne({
		location: {
			$near: [position.longitude, position.latitude], 
			$maxDistance: 100
		}
	});
	if (place)
		console.log(place.name);
	return place;
}