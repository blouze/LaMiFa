Template.gigNew.helpers({
	place: function () {
		return Places.findOne({_id: this.place_id});
	}
});