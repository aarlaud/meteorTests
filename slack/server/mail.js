Meteor.startup(function() {
	smtp = {
		username: 'antoine@newyorkbeesanctuary.org',
		password: 'SPXwJIU25K8qdlweFbpysw',
		server: 'smtp.mandrillapp.com',
		port: 587
	};

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});