Meteor.publish("gigs", function () {
	return Gigs.find();
});

Meteor.publish("gig", function (selector) {
	var gigItem = Gigs.findOne(selector);

	var gig = Gigs.find({_id: gigItem._id});
	var artist = Artists.find({_id: gigItem.artist_id});
	var place = Places.find({_id: gigItem.place_id});
	var votes = Votes.find({gig_id: gigItem._id});

	var user = Meteor.users.findOne({_id: this.userId});
	var posts;
	if (user && user.services && user.services.password)
		posts = Posts.find({gig_id: gigItem._id});
	else
		posts = Posts.find({gig_id: gigItem._id, locked: false});
	
	return [gig, artist, place, votes, posts];
});