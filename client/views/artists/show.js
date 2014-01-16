Template.artistShow.helpers({
	gigs: function () {
		return Gigs.find({ artist_id: this._id }, { sort: { date: 1 } });
	}, 
	artistPicture: function () {
		return "http://graph.facebook.com/" + this.facebook_id + "/picture?type=normal";
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