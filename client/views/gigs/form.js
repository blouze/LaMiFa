Template.gigForm.helpers({
	date_str: function () {
		console.log();
		var m = this.date ? moment.unix(this.date) : moment();
		return m.format("DD/MM/YYYY");
	}, 
	artist: function () {
		return Artists.findOne({_id: this.artist_id});
	}, 
	place: function () {
		return Places.findOne({_id: this.place_id});
	}, 
	fbEvent: function () {
		console.log(Session.get("fbEvent"));
		Meteor.call('getUserData', function(err, data) {
			if (err)
				console.log(err);
			else
				return data;
		});
	}
});

Template.gigForm.rendered = function () {
	$("#date").datetimepicker();

	$("#artist").typeahead({
		source: _.pluck(Artists.find().fetch(), "name")
	});

	$("#place").typeahead({
		source: _.pluck(Places.find().fetch(), "name")
	});
};

Template.gigForm.events({
	"keypress #gigForm": function (e, t) {
		if (t.find("*:focus") == t.find("#leaflet-control-geosearch-qry") && e.which === 13)
			return false;
	}, 

	"click #cancel": function (e, t) {
		if (this._id) 
			Router.go("gigShow", {_id: this._id});
		else
			Router.go("home");
	}, 

	"blur #facebook_id": function (e, t) {
		Session.set("fbEvent", t.find("#facebook_id").value);
	}, 

	"submit #gigForm": function (e, t) {
		e.preventDefault();

		var artist = Artists.findOne({name: t.find("#artist").value});
		var place = Places.findOne({name: t.find("#place").value});
		var gig = Gigs.findOne({_id: this._id});
		
		if (gig) 
			Gigs.update({_id: this._id}, {
				$set: {
					artist_id: artist._id, 
					place_id: place._id, 
					date: moment(t.find("#date").value, "DD/MM/YYYY").unix(), 
					facebook_id: t.find("#facebook_id").value
				}
			}, function (err, id) {
				if (err) 
					console.log(err);
				else
					Router.go("gigShow", {_id: gig._id});
			});
		else 
			Gigs.insert({
				date: moment(t.find("#date").value, "DD/MM/YYYY").unix(), 
				artist_id: artist._id, 
				place_id: place._id, 
				facebook_id: t.find("#facebook_id").value, 
				owner: Meteor.userId()
			}, function (err, id) {
				if (err) 
					console.log(err);
				else
					Router.go("gigShow", {_id: id});
			}); 
	}
});