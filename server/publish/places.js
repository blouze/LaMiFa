Meteor.publish("places", function () {
	return Places.find();
});