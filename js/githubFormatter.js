App.GithubFormatter = function() {

}

App.GithubFormatter.prototype._formatTime = function(apiTime) {
	return moment(apiTime, "YYYY-MM-DDTHH:mm").fromNow();
}

App.GithubFormatter.prototype._formatUrl = function(apiUrl) {
	return apiUrl.replace('https://api.', 'https://').replace('/repos/', '/');
}

App.GithubFormatter.prototype._formatWatch = function(apiData) {
	var formattedData = { };
	formattedData.isWatchEvent = true;

	formattedData.actorName = apiData.actor.login;
	formattedData.repoName = apiData.repo.name;
	formattedData.repoUrl = this._formatUrl(apiData.repo.url);
	formattedData.time = this._formatTime(apiData.created_at);
	formattedData.iconClass = 'star-icon';
	return formattedData;
}

App.GithubFormatter.prototype._formatPush = function(apiData) {
	var _this = this,
		formattedData = { };

	formattedData.isPushEvent = true;
	formattedData.time = this._formatTime(apiData.created_at);
	formattedData.repoName = apiData.repo.name;
	formattedData.repoUrl = this._formatUrl(apiData.repo.url);
	formattedData.iconClass = 'push-icon';
	formattedData.description = '';
	formattedData.commits = [];

	$.each(apiData.payload.commits, function(index, apiCommit) {
		var commit = {
			message: apiCommit.message
		};
		formattedData.commits.push(commit);
	});

	return formattedData;
}

App.GithubFormatter.prototype._formatIssue = function(apiData) {

}

App.GithubFormatter.prototype.format = function(apiData) {
	var _this = this,
		data = [];

	$.each(apiData, function(index, value) {
		switch(value.type) {
			case 'WatchEvent':
				data.push(_this._formatWatch(value));
				break;
			case 'PushEvent':
				data.push(_this._formatPush(value))
				break;
			case 'IssuesEvent':
				break;
			case 'IssueCommentEvent':
				break;
			case 'ForkEvent':
				break;
			case 'MemberEvent':
				break;
		}
	});

	return data;
}