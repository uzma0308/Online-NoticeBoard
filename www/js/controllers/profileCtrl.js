myCtrl.controller('profileCtrl', function($scope,$http,$ionicModal,$ionicPopup) {

	$scope.name=window.localStorage.getItem("name");
	
	$scope.email=window.localStorage.getItem("email");


console.log("in profile ctrller");

$scope.hello=function()
{
	console.log("Hello");
};

 $scope.fileChanged = function(){
            angular.element('#fileUplaodUser').trigger('click');
          };

        $scope.pictureSelected = function(data){
    
            console.log(data.files[0]);
            $scope.imgLoader1= window.URL.createObjectURL(data.files[0]);
            console.log($scope.imgLoader1);
            var image_type=data.files[0].type;
            console.log(image_type);

            var user_id=window.localStorage.getItem("id");
            console.log(user_id);

            var fd  = new FormData();
            fd.append("userImage",data.files[0]);
            fd.append("userId",user_id);  
            fd.append("imageType",image_type);


           $('#imgProfilePic').attr('src', $scope.imgLoader1);
            $http({

                method: 'POST',
                url: 'http://127.0.0.1:8080/uploadImage',
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                data: fd
              }).then(function successCallback(response) 
                {
                  console.log("uploaded successfully");
                  console.log(response.data[0].path);

                  // console.log(response.data.data.path);

            var img = $('<img>'); //Equivalent: $(document.createElement('img'))
            img.attr('src', response.data[0].path);
            img.appendTo('#img_wrapper_notices');


                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.

                  console.log('fail');
                });
      
          };

});