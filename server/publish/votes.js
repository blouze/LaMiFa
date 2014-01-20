Meteor.publish("votes", function () {
	return Votes.find();
});

Meteor.publish("vote", function (selector) {
	return Votes.find(selector);
});