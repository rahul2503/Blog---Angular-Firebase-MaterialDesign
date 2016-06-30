app.controller('viewBlogController',['$scope','$location','$timeout','$stateParams', function($scope, $location, $timeout, $stateParams) {

	$scope.blogId = $stateParams.blogId;
	$scope.blogDetails = {};
	$scope.allTags = [];

	getBlogDetails($scope.blogId);
	function getBlogDetails(blogId) {
		database.ref('blogs/'+blogId+'/').once('value', function(snapshot) {
			$timeout(function() {
				$scope.blogDetails = {
					id: snapshot.val().id,
					title: snapshot.val().title,
					subTitle: snapshot.val().subTitle,
					date: snapshot.val().createdDate,
					description: snapshot.val().description,
					tags: snapshot.val().tags
				};
			},10);
			if (snapshot.val().tags != undefined) {
				for (var i = 0; i < snapshot.val().tags.length; i++) {
					$scope.allTags.push({
						tags: snapshot.val().tags[i]
					});
				}
			}
		});
	}

	$scope.viewBlogs = function() {
		$location.path('/home');
	}
}]);
