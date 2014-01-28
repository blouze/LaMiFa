Template.gigShow.helpers({
	artist: function () {
		return Artists.findOne();
	}, 
	place: function () {
		return Places.findOne();
	}, 
	posts: function () {
		return Posts.find({gig_id: this._id}, {sort: {time: -1}});
	}, 
	gigPicture: function () {
		return "http://graph.facebook.com/" + this.facebook_id + "/picture?type=large";
	}, 
	artistThumbnail: function () {
		var artist = Artists.findOne();
		if (artist)
			return "http://graph.facebook.com/" + artist.facebook_id + "/picture?type=square";
	}, 
	placeThumbnail: function () {
		var place = Places.findOne();
		if (place)
			return "http://graph.facebook.com/" + place.facebook_id + "/picture?type=square";
	}
});

Template.gigShow.events({
	"click a#remove": function (e, t) {
		e.preventDefault();
		if (confirm("Effacer l'évènement?")) 

			Gigs.remove({
				_id: this._id
			}, function (err) {
				console.log();
				if (err) 
					console.log(err);
				else
					Router.go("home");
			});
	}, 

	"click button#postPicture": function (e, t) {
		var gig_id = this._id;
		filepicker.pick({
			mimetypes: ['image/*'],
			container: 'modal',
			services:['COMPUTER'],
		},
		function(InkBlob){
			var inkBlob = JSON.stringify(InkBlob);
			console.log(InkBlob);
			Posts.insert({
				owner: Meteor.userId(), 
				gig_id: gig_id, 
				type: "picture", 
				content: InkBlob.url 
			}, function (err, id) {
				if (err) 
					console.log(err);
				else
					console.log(id);
			});
		},
		function(FPError){
			console.log(FPError.toString());
		});
	}
});
