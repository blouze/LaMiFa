Meteor.publish("places", function (position) {
	return Places.find();
});