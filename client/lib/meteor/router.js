Router.configure({
	layoutTemplate: "layout", 
	loadingTemplate: "loading", 
	notFoundTemplate: "notFound"
});


Router.map(function () {

	this.route("home", {
		path: "/", 
		waitOn: function () {
			Meteor.subscribe("places", Session.get("userPosition"));
		}
	});

	this.route("about", {
		path: "/about"
	});

	this.route("login", {
		path: "/login"
	});

	this.route("gigNew", {
		path: "/gig/new"
	});

	this.route("gigShow", {
		path: "/gig/:_id", 
		waitOn: function () {
			Meteor.subscribe("gig", this.params._id);
		}, 
		data: function () {
			return Gigs.findOne({_id: this.params._id});
		}
	});

	this.route("gigEdit", {
		path: "/gig/:_id/edit", 
		waitOn: function () {
			Meteor.subscribe("gig", this.params._id);
		}, 
		data: function () {
			return Gigs.findOne({_id: this.params._id});
		}
	});

	this.route("artistNew", {
		path: "/artist/new"
	});

	this.route("artistShow", {
		path: "/artist/:_id", 
		before: function () {
			Meteor.subscribe("gigs", {artist_id: this.params._id});
		}, 
		waitOn: function () {
			Meteor.subscribe("artist", this.params._id);
		}, 
		data: function () {
			return Artists.findOne({_id: this.params._id});
		}
	});

	this.route("artistEdit", {
		path: "/artist/:_id/edit", 
		waitOn: function () {
			Meteor.subscribe("artist", this.params._id);
		}, 
		data: function () {
			return Artists.findOne({_id: this.params._id});
		}
	});

	this.route("placeNew", {
		path: "/place/new", 
		before: function () {
			Session.set("mapSearchLocation", null);
		}
	});

	this.route("placeShow", {
		path: "/place/:_id", 
		waitOn: function () {
			Meteor.subscribe("place", this.params._id);
		}, 
		data: function () {
			return Places.findOne({_id: this.params._id});
		}
	});

	this.route("placeEdit", {
		path: "/place/:_id/edit", 
		before: function () {
			var place = Places.findOne({_id: this.params._id});
			if (place)
				Session.set("mapSearchLocation", {
					X: place.location[1], 
					Y: place.location[0], 
					Label: place.address
				});
		}, 
		waitOn: function () {
			Meteor.subscribe("place", this.params._id);
		}, 
		data: function () {
			return Places.findOne({_id: this.params._id});
		}
	});
});