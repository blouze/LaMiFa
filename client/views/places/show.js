Template.placeShow.helpers({
	place: function () {
		return Places.findOne({_id: this.place_id});
	}
});

Template.placeShow.events({
	"click a#remove": function (e, t) {
		e.preventDefault();
		if (confirm("Effacer le lieu?")) 

			Places.remove({
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