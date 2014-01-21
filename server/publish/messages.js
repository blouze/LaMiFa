Meteor.publish("messages", function () {
	return Messages.find();
});

Meteor.publish("message", function (selector) {
	return Messages.find(selector);
});