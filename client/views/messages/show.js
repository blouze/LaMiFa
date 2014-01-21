Template.message.helpers({
	user: function () {
		console.log(this.owner)
		return Meteor.users.find({ _id: this.owner});
	}, 

	userPicture: function () {
		var user = Meteor.users.find({ _id: this.owner});
		console.log(this.user)
		if (user && user.services) {
			console.log("http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=square");
			if (user.services.facebook) 
				return "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=square";
		}
	}
});