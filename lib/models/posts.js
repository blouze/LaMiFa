Posts = new Meteor.Collection('posts');

Posts.allow({
  insert: function (userId, doc) {
  	var userHasVoted = Votes.findOne({
  		user_id: userId, 
  		gig_id: doc.gig_id
  	});
    doc.time = Date.now();
    doc.locked = false;
    console.log(doc);

    // the user must be logged in, and the document must be owned by the user
    return userId && doc.owner === userId && userHasVoted;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    var isAdmin = Meteor.user() && Meteor.user().services && Meteor.user().services.password;
    return doc.owner === userId || isAdmin;
  },
  remove: function (userId, doc) {
    var isAdmin = Meteor.user() && Meteor.user().services && Meteor.user().services.password;
    // can only remove your own documents
    return doc.owner === userId || isAdmin;
  },
  fetch: ['owner']
});

Posts.deny({
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'owner');
  },
  remove: function (userId, doc) {
    // can't remove locked documents
    return doc.locked;
  },
  fetch: ['locked'] // no need to fetch 'owner'
});