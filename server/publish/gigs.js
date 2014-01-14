Meteor.publish("gigs", function (position) {
	return Gigs.find();
});

Meteor.publish("gig", function (selector) {
	return Gigs.find(selector);
});