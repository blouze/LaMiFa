Template.gigEdit.settings = function() {
	return {
		position: "top",
		limit: 5,
		rules: [
		{
			token: '@',
			collection: Places,
			field: "position.Label",
			template: Template.userPill
		}
		]
	}
};