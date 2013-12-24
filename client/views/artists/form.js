Template.artistForm.rendered = function () {
	$("#date").datepicker({
		language: "fr", 
		startDate: "today", 
		autoclose: true
	});
};

Template.artistForm.events({
	"keypress #artistForm": function (e, t) {
		if (t.find("*:focus") == t.find("#leaflet-control-geosearch-qry") && e.which === 13)
			return false;
	}, 

	"click #cancel": function (e, t) {
		if (this._id) 
			Router.go("artistShow", {_id: this._id});
		else
			Router.go("home");
	}, 

	"submit #artistForm": function (e, t) {
		e.preventDefault();

		if (this._id) {
			var artistId = this._id;
			Artists.update({ _id: this._id }, { $set: {
				name: t.find("#name").value, 
				facebook_id: t.find("#facebook_id").value
			} }, function (err) {
				if (err) 
					console.log(err);
				else 
					Router.go("artistShow", {_id: artistId});
			});
		}
		else {
			Artists.insert({
				name: t.find("#name").value, 
				facebook_id: t.find("#facebook_id").value, 
				owner: Meteor.userId()
			}, function (err, id) {
				if (err) 
					console.log(err);
				else
					Router.go("artistShow", {_id: id});
			});
		}
	}
});