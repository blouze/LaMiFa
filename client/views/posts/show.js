Template.post.helpers({
	owner: function () {
		return Meteor.users.findOne({ _id: this.owner});
	}, 

	ownerPicture: function () {
		var owner = Meteor.users.findOne({ _id: this.owner});
		if (owner && owner.services) {
			if (owner.services.facebook) 
				return "http://graph.facebook.com/" + owner.services.facebook.id + "/picture?type=square";
		}
	}, 
	timeAgo: function () {
		console.log(moment(this.time));
		return moment(this.time).format("DD/MM/YY HH:mm");
	}, 
	
	isComment: function () {
		return this.type == "comment";
	}, 

	isPicture: function () {
		return this.type == "picture";
	}
});