App.Router.map(function() {

});

App.ApplicationRoute = Ember.Route.extend({
	model: function() {
		return {
			title: "Tobias Anhalt",
			subTitle: "Entrepreneur, Developer, Futurist",
			links: [
				{name: "Contact", title: "Contact", target: "", url: "mailto:tobias.anhalt@mythli.net"},
				{name: "Twitter", title: "Twitter", target: "_blank", url: "#"},
				{name: "Github", title: "Github", target: "_blank", url: "#"},
				{name: "Stackoverflow", title: "Stackoverflow", target: "_blank", url: "#"}
			]
		};
	}
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		this.get('store').find('GithubActivity');
	}
});