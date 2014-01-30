Meteor.publish("users", function () {
	return Meteor.users.find();
});

Meteor.publish("user", function (selector) {
	var userItem = Meteor.users.findOne(selector);

	var user = Meteor.users.find({_id: userItem._id});
	var posts = Posts.find({owner: userItem._id});

	return [user, posts];
});