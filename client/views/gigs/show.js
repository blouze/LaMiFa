Template.gigShow.helpers({
	artist: function () {
		return Artists.findOne({_id: this.artist_id});
	}, 
	place: function () {
		return Places.findOne({_id: this.place_id});
	}, 
	gigPicture: function () {
		return "http://graph.facebook.com/" + this.facebook_id + "/picture?type=large";
	}, 
	artistThumbnail: function () {
		var artist = Artists.findOne({_id: this.artist_id});
		return "http://graph.facebook.com/" + artist.facebook_id + "/picture?type=square";
	}, 
	placeThumbnail: function () {
		var place = Places.findOne({_id: this.place_id});
		return "http://graph.facebook.com/" + place.facebook_id + "/picture?type=square";
	}
});

Template.gigShow.events({
	"click a#remove": function (e, t) {
		e.preventDefault();
		if (confirm("Effacer l'évènement?")) 

			Gigs.remove({
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