Handlebars.registerHelper("siteName", function () {
	return "La-Mi-Fa";
});

Handlebars.registerHelper("isAdmin", function () {
	if (Meteor.user() && Meteor.user().services)
		return Meteor.userId() && Meteor.user().services.password;
});

Handlebars.registerHelper("currentUserImage", function () {
	if (Meteor.user() && Meteor.user().services) {
		if (Meteor.user().services.facebook) 
			return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture?type=square";
	}
});

Handlebars.registerHelper("calendar", function (date) {
	if (date) 
		return moment(date, "X").calendar();
});

Handlebars.registerHelper("shortenedAdress", function (adress) {

	return _(adress).strLeftBack(", France");
});