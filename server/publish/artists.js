Meteor.publish("artists", function () {
	return Artists.find();
});