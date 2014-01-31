Meteor.publish("gigs", function () {
	return Gigs.find();
});

Meteor.publish("gig", function (selector) {
	var gigItem = Gigs.findOne(selector);

	var gig = Gigs.find({_id: gigItem._id});
	var artist = Artists.find({_id: gigItem.artist_id});
	var place = Places.find({_id: gigItem.place_id});
	var votes = Votes.find({gig_id: gigItem._id});
	var posts;
	var users;

	var user = Meteor.users.findOne({_id: this.userId});
	var postsSelector = {
		gig_id: gigItem._id
	};

	if (!(user && user.services && user.services.password))
		postsSelector.locked = false;

	posts = Posts.find(postsSelector);
	users = Meteor.users.find({
		_id: { $in: _.pluck(Posts.find(postsSelector).fetch(), "owner") }
	});

	//return simLatency([gig, artist, place, votes, posts], 1000);
	return [gig, artist, place, votes, posts, users];
});