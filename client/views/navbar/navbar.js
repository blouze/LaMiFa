Template.navbar_user_logged_out.events({
	'click #login': function (e, t) {
		e.preventDefault();
		Meteor.loginWithFacebook({
			requestPermissions: ["email", "read_friendlists", "publish_actions"], 
			forceApprovalPrompt: true
		}, function (err) {
			if (err) 
				console.log(err);
		});
	}
});

Template.navbar_user_logged_in.events({
	'click #logout': function (e, t) {
		e.preventDefault();
		Meteor.logout(function (err) {
			if (err) 
				console.log(err);
			else
				Router.go("home");
		});
	}
});