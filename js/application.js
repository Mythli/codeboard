(function(){
	var applicationTemplate = this["App"]["template/application.hbs"],
		activitiesTemplate = this["App"]["template/activities.hbs"];

	$('body').html(applicationTemplate(App.data));

	$.ajax({
		url: App.data.githubEventUrl
	}).done(function(apiData) {
		var githubFormatter = new App.GithubFormatter(),
			data = { };

		data.activities = githubFormatter.format(apiData)
		$('#site-content').html(activitiesTemplate(data));
	});


})();