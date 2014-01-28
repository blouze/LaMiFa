Meteor.publish("places", function (position) {
	if (!position)
		return Places.find();


	var place_ids = _.pluck(
		Places.find({
			location: {
				$geoWithin: {
					$centerSphere: [[position.longitude, position.latitude], 10.0 / 6371]
				}
			}
		}).fetch(), "_id");

	var gig_ids = _.pluck(
		Gigs.find({
			_id: { $in: place_ids }
		}).fetch(), "_id");

	var artist_ids = _.pluck(
		Gigs.find({
			_id: { $in: place_ids }
		}).fetch(), "artist_id");


	var places = Places.find({
		_id: { $in: place_ids }
	});

	var gigs = Gigs.find({
		_id: { $in: gig_ids }
	}, { sort: { date: 1 }});

	var artists = Artists.find({
		artist_id: { $in: artist_ids }
	});

	return [places, gigs, artists];
});

Meteor.publish("place", function (selector) {
	return Places.find(selector);
});