var location;

Template.placeForm.helpers({
	address: function () {
		location = Session.get("mapSearchLocation");
		return location ? location.Label : "";
	}
});

Template.placeForm.rendered = function () {
	initMap({
		minZoom: 5, 
		maxZoom: 18, 
		search: true
	});

	//Session.set("mapSearchLocation", null);

	if (this.data.location && !Session.get("mapSearchLocation")) {
		Session.set("mapSearchLocation", this.data.location);
	}

	if (location)
		markLocation(location);
};

Template.placeForm.events({
	"keypress #placeForm": function (e, t) {
		if (t.find("*:focus") == t.find("#leaflet-control-geosearch-qry") && e.which === 13)
			return false;
	}, 

	"click #cancel": function (e, t) {
		if (this._id) 
			Router.go("placeShow", {_id: this._id});
		else
			Router.go("home");
	}, 

	"submit #placeForm": function (e, t) {
		e.preventDefault();

		if (this._id) {
			var placeId = this._id;
			Places.update({ _id: this._id }, { $set: {
				name: t.find("#name").value, 
				location: location
			} }, function (err) {
				if (err) 
					console.log(err);
				else 
					Router.go("placeShow", {_id: placeId});
			});
		}
		else {
			Places.insert({
				name: t.find("#name").value, 
				location: location, 
				owner: Meteor.userId()
			}, function (err, id) {
				if (err) 
					console.log(err);
				else
					Router.go("placeShow", {_id: id});
			});
		}
	}
});