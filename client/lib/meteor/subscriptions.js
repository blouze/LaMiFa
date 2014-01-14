Meteor.subscribe('users');
Meteor.subscribe('artists');
Meteor.subscribe('places');
Meteor.subscribe('gigs', Session.get("userPosition"));