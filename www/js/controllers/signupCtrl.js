myCtrl.controller('signupCtrl', function($scope,$http,$location,$ionicModal,$ionicPopup,$window) {

		   angular.element('#name').focus();

		   $scope.user= {
		   	name:'',
		    email:'',
		    password: '',
		    confirmPassword:''
		  };

		  $scope.errorMsg="";
		  $scope.submitted=false;
		  $scope.focusVar=true;
			 // $scope.showMsg=false;
			  //$scope.errorMsgEmail="";
			  //$scope.errorMsgPass="";

		   $ionicModal.fromTemplateUrl('templates/modal.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });
			$( "input").focus(function() {

			  $scope.focusVar=false;
			  //$scope.msgPwd=false;

			});
			$( "input").focusout(function() {
			  $scope.focusVar=true;
			});

		$scope.send_userData=function(myForm)
		{
		
			if(myForm.$valid){
				console.log(myForm.$valid);
				if($scope.user.password==$scope.user.confirmPassword)
							{
							//signing up valid user
							    $http({
							      method: 'POST',
							      url: 'http://127.0.0.1:8080/sign_up',
							      data:$scope.user
							    }).then(function successCallback(response) 
							      {
							        console.log(response);
							      	if(response.data)
							      	{
							      		var alertPopup = $ionicPopup.alert({
									         title: 'Wrong Email!',
									         template: 'Email id already exist'
									      });

									      alertPopup.then(function(res) {
									      
									      	console.log("response");
							      		 	 location.reload();
									         
									      });
							      		 }
							    	else
							    	{
							    		$scope.modal.show();
							      		
							    	}
					         
							         }, function errorCallback(response) {
							  
							        console.log('fail');
							      });
							}
						    else
							{
									//$scope.modal.show();
							      	console.log("password missmatch");
									var x= document.getElementById('password');
									$scope.errorMsg="* Password mismatch";
									console.log($scope.errorMsg);
									//alert("Incorrect password match");
									console.log(x.value);
									$scope.user.password="";
									$scope.user.confirmPassword="";

									x.focus();
							}
		}
		else
		{
			$scope.submitted=true;	
		}

			
	};
		$scope.goto_login = function() {

				
	            $location.path('/login');
	            $scope.modal.hide();
	          };

	
});