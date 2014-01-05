Template.home.rendered = function () {
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(function (position) {
			Session.set("position", position.coords);
		});
	else
		console.log("Geolocation is not supported by this browser.");
};

Template.home.helpers({
	matchGig: function () {
		if (Session.get("position")) {
			var position = Session.get("position");
			var result = Gigs.findOne({
				location: {
					$near: [position.longitude, position.latitude], 
					$maxDistance: 100
				}
			});
			//console.log(result);
			return result;
		}
	}, 
	gigs: function () {
		return Gigs.find();
	}, 
	artists: function () {
		return Artists.find();
	}, 
	places: function () {
		return Places.find();
	}
});

Template.home.events({
	"click #login": function (e, t) {
		e.preventDefault();
		Meteor.loginWithFacebook({
			requestPermissions: ["email", "read_friendlists", "publish_actions"], 
			forceApprovalPrompt: true
		}, function (err) {
			if (err) 
				console.log(err);
			else 
				Session.set("userId", Meteor.userId());
		});
	}
});

Template.gigItem.helpers({
	artist: function () {
		return Artists.findOne({_id: this.artist_id});
	}, 
	place: function () {
		return Places.findOne({_id: this.place_id});
	}, 
	city: function () {
		var place = Places.findOne({_id: this.place_id});
		if (place.location)
			return _.words(place.location.Label, ", ").slice(-1);
	}, 
	gigThumbnail: function () {
		return "http://graph.facebook.com/" + this.facebook_id + "/picture?type=square";
	}
});