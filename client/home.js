Template.userPositionMap.rendered = function () {
	if (!this.mapInit) {
		initMap({
			minZoom: 5, 
			maxZoom: 18, 
			search: false, 
			zoomControl: false, 
			dragging: true, 
			touchZoom: false, 
			scrollWheelZoom: false, 
			doubleClickZoom: false, 
			boxZoom: false, 
		});

		this.mapInit = true;

		var position = Session.get("userPosition");
		if (position) {
			updatePosition({
				X: position.longitude, 
				Y: position.latitude
			});
		}

		updateMobility(Session.get("searchRadius"));
	}
};

var interval;

Template.userPositionMap.events({
	"click #plus": function (e, t) {
		Session.set("searchRadius", Session.get("searchRadius") * 1.5);
		updateMobility(Session.get("searchRadius"));
	}, 

	"click #minus": function (e, t) {
		Session.set("searchRadius", Math.max(Session.get("searchRadius") / 1.5, 100));
		updateMobility(Session.get("searchRadius"));
	}
});

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
		return Gigs.find({}, {sort: { date: 1 }});
	}, 

	artists: function () {
		return Artists.find();
	}, 

	places: function () {
		return Places.find();
	}
});

Template.homeBotron.events({
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