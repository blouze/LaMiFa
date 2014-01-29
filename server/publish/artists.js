Meteor.publish("artists", function () {
	return Artists.find();
});

Meteor.publish("artist", function (selector) {
	var artistItem = Artists.findOne(selector);

	var gig_ids = _.pluck(Gigs.find({artist_id: artistItem._id}).fetch(), "_id");
	var place_ids = _.pluck(Gigs.find({_id: {$in: gig_ids}}).fetch(), "place_id");

	var artist = Artists.find({_id: artistItem._id});
	var gigs = Gigs.find({_id: {$in: gig_ids}});
	var places = Places.find({_id: { $in: place_ids }});

	return [artist, gigs, places];
});