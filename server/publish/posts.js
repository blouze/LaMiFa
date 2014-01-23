Meteor.publish("posts", function () {
	return Posts.find();
});

Meteor.publish("post", function (selector) {
	return Posts.find(selector);
});