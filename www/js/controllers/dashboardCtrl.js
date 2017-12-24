myCtrl.controller('dashboardCtrl', function($scope,$http,$ionicPopup,$location) {
$scope.show=true;
$scope.arr=[];
$scope.logout_app=function()
	{ 
		var confirmPopup = $ionicPopup.confirm({
         title: 'ALERT',
         template: 'Are you sure you want to logout?'
      	});
		 confirmPopup.then(function(res) {

		  if(res) {
             console.log(window.localStorage.getItem("email"));

			window.localStorage.removeItem("email");
	        window.localStorage.removeItem("password");
	        console.log(window.localStorage.getItem("email"));


	        $location.path('/login');

		  }

			});

		};



	//fetching all the information from database on evry load 
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:8080/'
    }).then(function successCallback(response)

      {
      	 console.log(response);
        for (var i = 0;i<response.data.length; i++) {
          $scope.arr.push(response.data[i]);
         
      }
        //$scope.fetched_data = response.data[4].title;
       //console.log( response.data);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

        console.log('fail');
      });




}); 