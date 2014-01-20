Votes = new Meteor.Collection('votes');

Votes.allow({
  insert: function (userId, doc) {
  	userHasVoted = Votes.findOne({
  		user_id: userId, 
  		gig_id: doc.gig_id
  	});
  	doc.time = new Date().valueOf();
    // the user must be logged in, and the document must be owned by the user
    return userId && !userHasVoted;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.owner === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.owner === userId;
  },
  fetch: ['owner']
});

Votes.deny({
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