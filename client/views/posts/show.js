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

	isLocked: function () {
		return this.locked;
	}, 

	userHasVoted: function () {
		if (this.bonus) 
			return this.bonus.indexOf(Meteor.userId()) >= 0;

		if (this.malus) 
			return this.malus.indexOf(Meteor.userId()) >= 0;
	}
});

Template.post.events({
	'click #bonus': function (e, t) {
		Posts.update({_id: this._id}, {$addToSet: {bonus: Meteor.userId()}});
		if (err) 
			console.log(err);
	}, 

	'click #malus': function (e, t) {
		Posts.update({_id: this._id}, {$addToSet: {malus: Meteor.userId()}}, function (err) {
			if (err) 
				console.log(err);
		});
	}, 

	'click #lock': function (e, t) {
		e.preventDefault();
		var locked = this.locked ? this.locked : false;
		Posts.update({_id: this._id}, {$set: {locked: !locked}}, function (err) {
			if (err) 
				console.log(err);
		});
	}, 

	'click #remove': function (e, t) {
		e.preventDefault();
		if (confirm("Effacer le post?"))
			Posts.remove({
				_id: this._id
			}, function (err) {
				if (err) 
					console.log(err);
			});
	}
});