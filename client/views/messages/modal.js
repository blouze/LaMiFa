Template.messageModal.rendered = function () {
	$(".modal").on('shown.bs.modal', function() {
		$(this).find("#message").val("");
		$(this).find("#message").focus();
	});
};

Template.messageModal.events({
	"submit #messageForm": function (e, t) {
		e.preventDefault();
		Messages.insert({
			owner: Meteor.userId(), 
			gig_id: this._id, 
			content: t.find("#message").value
		}, function (err, id) {
			if (err) 
				console.log(err);
			else
				$("#messageModal").modal("hide");
		});
	}
});