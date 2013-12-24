Meteor.subscribe('users');
Meteor.subscribe('artists');
Meteor.subscribe('places');
Meteor.subscribe('events', Session.get("position"));