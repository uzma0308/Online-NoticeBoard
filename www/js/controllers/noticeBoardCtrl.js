myCtrl.controller('noticeBoardCtrl', function($scope,$http,$ionicModal) {
	$scope.arr=[];

$scope.full_des="";
$scope.title="";
   $scope.view_full=function() {

      console.log(this.data._id);
      $scope.full_des=this.data.description;
      $scope.title=this.data.title;
       $scope.modal.show();


    };

     $scope.closeModal= function() {
          
              $scope.modal.hide();

          };


    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

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