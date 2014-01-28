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
			place_id: { $in: place_ids }
		}).fetch(), "_id");

	var places = Places.find({
		_id: { $in: place_ids }
	});

	var gigs = Gigs.find({
		_id: { $in: gig_ids }
	}, { sort: { date: 1 }});

	return [places, gigs];
});

Meteor.publish("place", function (selector) {
	var placeItem = Places.findOne(selector);

	var gig_ids = _.pluck(Gigs.find({place_id: placeItem._id}).fetch(), "_id");
	var artist_ids = _.pluck(Gigs.find({_id: {$in: gig_ids}}).fetch(), "artist_id");

	var place = Places.find({_id: placeItem._id});
	var gigs = Gigs.find({_id: {$in: gig_ids}});
	var artists = Artists.find({_id: { $in: artist_ids }});

	return [place, gigs, artists];
});