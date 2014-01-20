Template.userVote.rendered = function () {
	$('.rateit').rateit()
};

Template.userVote.events({
	"click #vote": function (e, t) {
		e.preventDefault();
		Votes.insert({
			user_id: Meteor.userId(), 
			gig_id: this._id, 
			note: $('.rateit').rateit("value")
		}, function (err, id) {
			if (err) 
				console.log(err);
			else
				console.log(id);
		});
	}
});