Accounts.loginServiceConfiguration.remove({
	service: "facebook"
});

//if(process.env.ROOT_URL == "http://lamifa.com/"){
if(process.env.ROOT_URL == "http://local.lamifa.com:3000/"){
	Accounts.loginServiceConfiguration.insert({
		service: "facebook",
		appId: "596394113731167",
		secret: "cd6980deb4632546b22dbd9cb5bc8359"
	});
}
else {
	Accounts.loginServiceConfiguration.insert({
		service: "facebook",
		appId: "216086375237011",
		secret: "bad09b8828081a6bc12bd84e8f0f8f39"
	});
}