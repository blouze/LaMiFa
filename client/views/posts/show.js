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
		return moment(this.time).format("DD/MM/YY, HH:mm");
	}, 
	
	isComment: function () {
		return this.type == "comment";
	}, 

	isPicture: function () {
		return this.type == "picture";
	}, 

	userHasVoted: function () {
		return this.bonus && this.bonus.indexOf(Meteor.userId()) >= 0;
	}
});

Template.post.events({
	'click #bonus': function () {
		Posts.update({_id: this._id}, {$addToSet: {bonus: Meteor.userId()}}, function (err) {
		});
	}, 

	'click #malus': function () {
		Posts.update({_id: this._id}, {$addToSet: {malus: Meteor.userId()}}, function (err) {
		});
	}
});