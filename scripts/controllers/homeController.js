app.controller('homeController',['$scope','$location','$timeout', '$state', function($scope, $location, $timeout,$state) {
	$scope.blogsLists = [];
	$scope.tagIdList = {};
	$scope.tagsList = [];

	getAllBlogs();
	function getAllBlogs() {
		database.ref('blogs/').once('value', function(snapshot) {
			var tagList = [];
			snapshot.forEach(function(data) {
				$timeout(function() {
					$scope.blogsLists.push({
						id: data.val().id,
						title: data.val().title,
						subTitle: data.val().subTitle,
						date: data.val().createdDate,
						shortDescription: data.val().shortDescription,
						tags: data.val().tags
					});
				},10);

				if (data.val().tags != undefined) {
					for (var i = 0; i < data.val().tags.length; i++) {
						if (tagList.indexOf(data.val().tags[i].toLowerCase()) == -1) {
							tagList.push(data.val().tags[i].toLowerCase());
							$scope.tagsList.push({tags: data.val().tags[i]});
						}
					}
				}
			});
		});
	}

	$scope.createNewBlog = function() {
		$location.path('/createBlog');
	}

	$scope.viewBlog = function(id) {
		console.log("ababa "+id);
		$state.go("viewBlog", {blogId: id});
	}

	$scope.searchBlogsByTag = function(tag) {
		database.ref('blogs/').once('value', function(snapshot) {
			snapshot.forEach(function(data) {
			var keepGoing = true;
			var tagPresent = false;
			$scope.blogsLists = [];
			if (keepGoing) {
					$timeout(function() {
						for (var i = 0; i < data.val().tags.length; i++) {
							if (keepGoing) {
								if (tag == data.val().tags[i]) {
									keepGoing = false;
									tagPresent = true;
								}
							}
						}
						if (tagPresent) {
							$scope.blogsLists.push({
								id: data.val().id,
								title: data.val().title,
								subTitle: data.val().subTitle,
								date: data.val().createdDate,
								shortDescription: data.val().shortDescription,
								tags: data.val().tags
							});
						}
					},10);	
				}
			});
		});
	}
}]);
