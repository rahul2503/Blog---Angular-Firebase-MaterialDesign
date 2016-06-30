app.controller('createBlogController', ['$scope','$location','$timeout','$compile', function($scope, $location, $timeout, $compile) {

	var pushBlogKey = database.ref('blogs/').push().key;
	$scope.tagDetails = {};
	$scope.tagList = [];
	$scope.tagIdList = [];

	$scope.addBlog = function(blog) {
		var temp = {};
		var temp = {
			id: pushBlogKey,
			title: blog.title,
			subTitle: blog.subTitle,
			shortDescription: blog.shortDescription,
			description: blog.description,
			createdDate: new Date().toISOString().split("T")[0],
			tags: $scope.tagList
		}

		var updates = {};
		updates['blogs/'+pushBlogKey] = temp;
		database.ref().update(updates);
		$location.path('/home');
	};

	$scope.viewBlogs = function() {
		$location.path('/home');
	}

	$scope.appendNewTag = function(tag) {
		$scope.tagList.push(tag);
		console.log(pushBlogKey);
		$scope.blog.tags = '';
		document.getElementById('tagInput').focus();

		searchTagByName(tag);
	}

	function searchTagByName(tag) {
		database.ref('tags/').once('value', function(snapshot) {
			if (snapshot.val() != undefined) {
				var tagPresent = false;
				var keepGoing = true;
				$timeout(function() {
					snapshot.forEach(function(data) {
						if (keepGoing) {
							if (data.val().name == tag) {
								tagPresent = true;
								console.log("abcd");
								$scope.tagDetails = {
									tagName: data.val().name,
									tagId:  data.val().id
								}
								keepGoing = false;
							} else {
								tagPresent = false;
							}
						}
					});

					console.log("tagPresent - "+tagPresent);
					if (tagPresent == true) {
						console.log("tag already present");
						
						var updates = {};
						updates['tags/'+$scope.tagDetails.tagId+'/blogs/'+pushBlogKey+'/blogId'] = pushBlogKey;
						database.ref().update(updates);
					} else {
						console.log("new tag");
						var tagKey = database.ref('tags/').push().key;
						var temp = {
							id: tagKey,
							name: tag,
						};

						var updates = {};
						updates['tags/'+tagKey] = temp;
						database.ref().update(updates);
					}
				},5);
			} else {
				console.log("first tag");
				var tagKey = database.ref('tags/').push().key;
				var temp = {
					id: tagKey,
					name: tag,
					blogId: pushBlogKey
				};

				var updates = {};
				updates['tags/'+tagKey] = temp;
				database.ref().update(updates);
			}
		});
	}
}]);
