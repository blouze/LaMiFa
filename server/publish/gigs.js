Meteor.publish("gigs", function () {
	return Gigs.find();
});

Meteor.publish("gig", function (selector) {
	return Gigs.find(selector);
});