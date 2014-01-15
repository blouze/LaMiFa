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
	if (position) {
		markLocation({
			X: position.longitude, 
			Y: position.latitude
		});
	}
};

Template.home.helpers({
	matchGig: function () {
		var position = Session.get("userPosition");
		if (position) {
			var places = Places.find({
				location: {
					$near: [position.longitude, position.latitude], 
					$maxDistance: 100
				}
			});
			console.log(places.fetch());
			return;
			if (places.count() > 0 && places.fetch()[0]) {
				var place_id = places.fetch()[0]._id;
				console.log(place_id);
				return Gigs.findOne({
					place_id: place_id
				});
			}
		}
	}, 
	gigs: function () {
		var position = Session.get("userPosition");
		if (position) {
			var places = _.pluck(Places.find({
				location: {
					$near: [position.longitude, position.latitude], 
					$maxDistance: 100
				}
			}).fetch(), "_id");
			//console.log(places);
			var result = Gigs.find({
				place_id: { $in: places }
			}, { sort: { date: 1 }});
			return result;
		}
	}, 
	artists: function () {
		return Artists.find();
	}, 
	places: function () {
		return Places.find();
	}, 
	matchPlaces: function () {
		return matchPlaces(Session.get("userPosition"));
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