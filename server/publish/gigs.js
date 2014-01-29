Meteor.publish("gigs", function () {
	return Gigs.find();
});

Meteor.publish("gig", function (selector) {
	var gigItem = Gigs.findOne(selector);

	var gig = Gigs.find({_id: gigItem._id});
	var artist = Artists.find({_id: gigItem.artist_id});
	var place = Places.find({_id: gigItem.place_id});
	var votes = Votes.find({gig_id: gigItem._id});
	var posts = Posts.find({gig_id: gigItem._id});
	
	return [gig, artist, place, votes, posts];
});