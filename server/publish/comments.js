Meteor.publish("comments", function () {
	return Comments.find();
});

Meteor.publish("comment", function (selector) {
	return Comments.find(selector);
});