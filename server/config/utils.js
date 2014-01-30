var Future = Npm.require('fibers/future');

simLatency = function (payload) {
	var future = new Future;
	Meteor.setTimeout(function () {
		future.return(payload);
	}, 1000);

	return future.wait();
}