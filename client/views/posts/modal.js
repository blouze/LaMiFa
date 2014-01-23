Template.commentModal.rendered = function () {
	$(".modal").on('shown.bs.modal', function() {
		$(this).find("#comment").val("");
		$(this).find("#comment").focus();
	});
};

Template.commentModal.events({
	"submit #commentForm": function (e, t) {
		e.preventDefault();

		Posts.insert({
			owner: Meteor.userId(), 
			gig_id: this._id, 
			type: "comment", 
			content: t.find("#comment").value
		}, function (err, id) {
			if (err) 
				console.log(err);
			else
				$("#commentModal").modal("hide");
		});
	}
});