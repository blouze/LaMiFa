Meteor.publish("pictures", function () {
	return Pictures.find();
});

Meteor.publish("picture", function (selector) {
	return Pictures.find(selector);
});