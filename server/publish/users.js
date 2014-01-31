Meteor.publish("users", function () {
	return Meteor.users.find({}, {fields: {service: 1}});
});

Meteor.publish("user", function (selector, options) {
	var user = Meteor.users.find(selector);
	
	if (options) {
		if (options.posts) {
			var userItem = Meteor.users.findOne(selector);
			var postsSelector = {
				owner: userItem._id
			};
			var posts = Posts.find(postsSelector);
			return [user, posts];
		}
	}

	return user;
});