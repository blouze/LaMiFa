Template.placeShow.helpers({
	gigs: function () {
		return Gigs.find({ place_id: this._id }, { sort: { date: 1 } });
	}, 
	placePicture: function () {
		return "http://graph.facebook.com/" + this.facebook_id + "/picture?type=large";
	}
});

Template.placeShow.events({
	"click a#remove": function (e, t) {
		e.preventDefault();
		if (confirm("Effacer le lieu?")) 

			Places.remove({
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