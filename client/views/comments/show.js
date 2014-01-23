Template.comment.helpers({
	owner: function () {
		return Meteor.users.findOne({ _id: this.owner});
	}, 

	ownerPicture: function () {
		var owner = Meteor.users.findOne({ _id: this.owner});
		if (owner && owner.services) {
			if (owner.services.facebook) 
				return "http://graph.facebook.com/" + owner.services.facebook.id + "/picture?type=square";
		}
	}
});