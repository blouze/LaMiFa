Template.login.events({

	"click #cancel": function () {
		Router.go("home");
	}, 

	"submit #loginForm": function (e, t) {
		e.preventDefault();
	}
});


Template.login.rendered = function () {

	$("#loginForm").parsley({

		successClass: 'has-success',
		errorClass: 'has-warning',

		errors: {

			classHandler: function(el) {
				return $(el).closest('.form-group');
			},
			errorsWrapper: '<span class=\"help-inline col-sm-4\"></span>',
			errorElem: '<span class=\"label label-warning\"></span>', 

			container: function (el, isRadioOrCheckbox) {
				return $(el).parent().parent();
			}
		}, 

		listeners: {

			"onFormSubmit": function (isFormValid, event, pForm) {

				if (isFormValid) {

					var email = $("#email").val(), password = $("#password").val();
					
					Meteor.loginWithPassword(email, password, function (err) {
						
						if (err) {
							
							var message;
							console.log(err);

							if(err.reason === "Incorrect password") 
								message = "Mot de passe éronné";
							else if(err.reason === "User not found") 
								message = "Utilisateur inconnu";
							
							$('#error').html('<span class="label label-warning">' + message + '</span>')
							$('#error').show();
						}
						else
							Router.go("home");
					});
				}
			}, 

			"onFieldSuccess": function () {

				$('#error').hide();
			}
		}
	});

$('#error').hide();
};