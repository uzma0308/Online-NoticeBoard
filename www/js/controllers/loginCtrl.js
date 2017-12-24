myCtrl.controller('loginCtrl', function($scope,$http,$location) {
	 $scope.user= {
    email:'',
    password:''
  };
  $scope.submitted=false;
  $scope.errorMsg="";
  $scope.flag=true;
  $scope.focusVar=true;
  $scope.remove_error=function()
	{ 
		$scope.errorMsg="";
	};

$( "input").focus(function() {
  $scope.focusVar=false;
});
$( "input").focusout(function() {
  $scope.focusVar=true;
});

$scope.send_userData=function(myForm)
	{ 
		
		if(myForm.$valid){
		$http({
		      method: 'POST',
		      url: 'http://127.0.0.1:8080/login',
		      data:$scope.user
		    }).then(function successCallback(response) 
		      {
		      
		         if(response.data)
		         {
		         	var x= JSON.stringify(response.data);
		         	//console.log(response.data[0].email);
		         	window.localStorage.setItem("email",JSON.stringify(response.data[0].email));
                    window.localStorage.setItem("password",response.data[0].password);
                    window.localStorage.setItem("id",response.data[0]._id);
                    window.localStorage.setItem("name",response.data[0].name);
                    


		            console.log(response);
		        	$location.path('/dashboard/noticeBoard');
		          }
		         else
		          {
		          	$scope.flag=false;
		          	$scope.errorMsg="* Oops invalid username or password";	
		          	$scope.user.email="";
		          	$scope.user.password="";
		          	angular.element('#email').focus();
		     
		          }

		         
		      }, function errorCallback(response) {
		  
		        console.log('fail');
		      });

		}
		else
		{
			$scope.errorMsg=" ";	
			$scope.submitted=true;
			$scope.flag=true;

		}
		   
	};
});

