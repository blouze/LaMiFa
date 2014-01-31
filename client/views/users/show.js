Template.userShow.helpers({
	posts: function () {
		return Posts.find({}, {sort: {time: -1}});
	}
});

Template.userProfile.helpers({
	userHasVoted: function () {
		return Meteor.userId() && Votes.findOne({
			user_id: Meteor.userId(), 
			gig_id: this._id
		})
	}
});

var userNote;
Template.userVote.rendered = function () {
	$('.raty').raty({
		path: '/img/raty', 
		half: true, 
		click: function(score, evt) {
			userNote = score;
		}
	});
};

Template.userVote.events({
	"click #vote": function (e, t) {
		e.preventDefault();
		Votes.insert({
			user_id: Meteor.userId(), 
			gig_id: this._id, 
			note: userNote
		}, function (err, id) {
			if (err) 
				console.log(err);
			else
				console.log(id);
		});
	}
});