Meteor.publish("places", function (position) {
	var places;
	if (!position)
		places = Places.find();
	else
		places = Places.find({
			location: {
				$near: [position.longitude, position.latitude], 
				$maxDistance: 100
			}
		}, { limit: 2 });
	console.log(_.pluck(places.fetch(), "name"));
	return places;
});

Meteor.publish("place", function (selector) {
	return Places.find(selector);
});