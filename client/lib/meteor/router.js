Router.configure({
	layoutTemplate: "layout", 
	loadingTemplate: "loading", 
	notFoundTemplate: "notFound"
});

Router.after(function () {
	if(this.route.name != "home")
		$(window).scrollTop(0);

	this.subscribe("user", Meteor.userId());
});

Router.map(function () {

	this.route("home", {
		path: "/", 
		before: function () {
			this.mapInit = false;
		}, 
		waitOn: function () {
			if (Session.get("userPosition"))
				Meteor.subscribe("places", Session.get("userPosition"), Session.get("searchRadius"));

			if (Meteor.user() && Meteor.user().services && Meteor.user().services.password) {
				Meteor.subscribe("places");
			}
		}
	});

	this.route("about", {
		path: "/about"
	});

	this.route("login", {
		path: "/login"
	});

	this.route("gigNew", {
		path: "/gig/new", 
		before: function () {
			this.subscribe("artists");
			this.subscribe("places");
		}
	});

	this.route("gigShow", {
		path: "/gig/:_id", 
		before: function () {
			this.subscribe("gig", this.params._id).wait();
		}, 
		data: function () {
			return Gigs.findOne({_id: this.params._id});
		}
	});

	this.route("gigEdit", {
		path: "/gig/:_id/edit", 
		before: function () {
			this.subscribe("gig", this.params._id).wait();
			this.subscribe("artistes");
			this.subscribe("places");
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
			this.subscribe("artist", this.params._id).wait();
		}, 
		data: function () {
			return Artists.findOne({_id: this.params._id});
		}
	});

	this.route("artistEdit", {
		path: "/artist/:_id/edit", 
		before: function () {
			this.subscribe("artist", this.params._id).wait();
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
		before: function () {
			this.subscribe("place", this.params._id).wait();
		}, 
		data: function () {
			return Places.findOne({_id: this.params._id});
		}
	});

	this.route("placeEdit", {
		path: "/place/:_id/edit", 
		before: function () {
			this.subscribe("place", this.params._id).wait();
		}, 
		data: function () {
			var place = Places.findOne({_id: this.params._id});
			if (place)
				Session.set("mapSearchLocation", {
					X: place.location[0], 
					Y: place.location[1], 
					Label: place.address
				});
			return place;
		}
	});

	this.route("userShow", {
		path: "/user/:_id", 
		before: function () {
			this.subscribe("user", this.params._id, {posts: true}).wait();
		}, 
		data: function () {
			return Meteor.users.findOne({_id: this.params._id});
		}
	});
});