Template.userPositionMap.rendered = function () {
	if (!this.mapInit) {
		initMap({
			minZoom: 5, 
			maxZoom: 18, 
			search: false
		});
		this.mapInit = true;
	}

	var position = Session.get("userPosition");
	console.log(position);
	if (position) {
		markLocation({
			X: position.longitude, 
			Y: position.latitude
		});
		markMobility(0.300);
	}
};

Template.home.rendered = function () {
};

Template.home.helpers({
	userPosition: function () {
		return Session.get("userPosition");
	}, 

	matchGig: function () {
		return;
		var position = Session.get("userPosition");
		if (!position)
			return;

		var place = Places.findOne({
			location: {
				$near: [position.longitude, position.latitude], 
				$maxDistance: 100
			}
		});

		if (place)
			return Gigs.findOne({
				place_id: place._id
			});
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
			requestPermissions: ["email", "user_events", "read_friendlists", "publish_actions"], 
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
		if (place && place.address)
			return _.words(place.address, ", ").slice(-1);
	}, 

	gigThumbnail: function () {
		return "http://graph.facebook.com/" + this.facebook_id + "/picture?type=square";
	}
});