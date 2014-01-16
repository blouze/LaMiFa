Meteor.publish("artists", function () {
	return Artists.find();
});

Meteor.publish("artist", function (selector) {
	return Artists.find(selector);
});