Meteor.publish("users", function () {
	return Meteor.users.find();
});

Meteor.publish("user", function (selector) {
	return Meteor.users.find(selector);
});