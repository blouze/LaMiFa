Template.artistShow.helpers({
	gigsToCome: function () {
		return Gigs.find({ date: { $gt: moment().unix() } }, { sort: { date: 1 } });
	}, 

	pastGigs: function () {
		return Gigs.find({ date: { $lt: moment().unix() } }, { sort: { date: 1 } });
	}, 

	artistPicture: function () {
		return "http://graph.facebook.com/" + this.facebook_id + "/picture?type=large";
	}
});

Template.artistShow.events({
	"click a#remove": function (e, t) {
		e.preventDefault();
		if (confirm("Effacer l'artiste?")) 

			Artists.remove({
				_id: this._id
			}, function (err) {
				console.log();
				if (err) 
					console.log(err);
				else
					Router.go("home");
			});
	}
});