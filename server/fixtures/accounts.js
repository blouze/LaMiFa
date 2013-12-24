if ( Meteor.users.find().count() === 0 ) {
	Accounts.createUser({
		username: 'Blouze',
		email: 'blouze@gmail.com',
		password: 'blouze'
	});
}