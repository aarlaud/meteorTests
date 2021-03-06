Meteor.startup(function() {
	Session.set('channel','general');
});

Template.messages.helpers({
	messages: Messages.find({})
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper("timestampToTime", function (timestamp) {
	var date = new Date(timestamp);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.registerHelper("usernameFromId", function (userId) {
	var user = Meteor.users.findOne({_id: userId});
	if (typeof user === "undefined") {
		return "Anonymous";
	}
	if (typeof user.services.github !== "undefined") {
		return user.services.github.username;
	}
	return user.username;
});

Template.listings.helpers({
	channels: function (){
		return Channels.find({});
	}
});

Template.header.helpers({
	channel: function(){
		return Session.get('channel');
	}
});



Template.channel.helpers({
	active: function() {
		if(Session.get('channel') === this.name){
			return "active";
		} else {
			return "";
		}
	}
});

Meteor.subscribe('messages');
Meteor.subscribe('allUsernames');
Meteor.subscribe('channels');

Template.messages.onCreated(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('messages', Session.get('channel'));
	});
});