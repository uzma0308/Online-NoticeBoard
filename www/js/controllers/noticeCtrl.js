myCtrl.controller('noticeCtrl', function($scope,$http,$ionicModal,$ionicPopup,$window) {

  $scope.show=true;

  $scope.arr=[];

  $scope.models= {
    title:'',
    data: '',
    categorySelected:[],
    name:'',
    id:''
  };
  $scope.imgLoader='';

  $scope.modals={
    titleInModal:'',
    dataInModal:'',
    id:''
   };



  $scope.userId={
    user_id_store:window.localStorage.getItem("id")
  };

var edit_data;

 $scope.categoryList=[
    { text: "Important", checked: false },
    { text: "Sports", checked: false },
    { text: "Examination", checked: false},
    { text: "Event", checked: false},
    {text: "Others", checked: false}
    ];

  $scope.selectedList={};
  
  $scope.loader_show=true; 

    $http({
      method: 'POST',
      url: 'http://127.0.0.1:8080/getSelected',
      data:$scope.userId
    }).then(function successCallback(response) 
      {
        $scope.loader_show=false;
        for (var i = 0;i<response.data.length; i++)
         {
            $scope.arr.push(response.data[i]);
         }
            console.log($scope.arr);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

        console.log('fail');
      });

 
//submitting the data

    $scope.submit = function() {

      $scope.modal1.show();
     };

  $scope.insideSubmit=function()
  {
          console.log("inside submit");

            
          angular.forEach($scope.selectedList, function (selected, day) {
                    if (selected) {

                       //console.log(day);
                       $scope.models.categorySelected.push(day);

                    }
                });

          $scope.models.name=window.localStorage.getItem("name");
          $scope.models.id=window.localStorage.getItem("id");
        
           
       $http({

              method: 'POST',
              url: 'http://127.0.0.1:8080/writeData',
              data: $scope.models

            }).then(function successCallback(response) 
            {

              $scope.models.title='';
               $scope.models.data='';

               $scope.models.categorySelected=[];

               $scope.selectedList={};

               $window.location.reload(); 

                
                console.log("Success");



              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                console.log('fail');
              });

             $scope.modal1.hide();
             //$route.reload();
 };

  //submitting the edited data

$scope.submitAgain = function() {
  $scope.modals.id=edit_data;
  
  $http({
      method: 'POST',
      url: 'http://127.0.0.1:8080/writeUpdatedData',
      data: $scope.modals
    }).then(function successCallback(response) {

      $window.location.reload(); 
    });
  };

    $scope.fileChanged = function(){
            angular.element('#fileUplaod').trigger('click');
          };

        $scope.pictureSelected = function(data){
         // console.log(data);
            console.log(data.files[0]);
            $scope.imgLoader= window.URL.createObjectURL(data.files[0]);
            console.log($scope.imgLoader);
            
            var img = $('<img>'); //Equivalent: $(document.createElement('img'))
            img.attr('src', $scope.imgLoader);
            img.appendTo('#img_wrapper_notices');//code to appnd image to the particukar div which is hereok ok?

          };



  $scope.delete_data=function()
  {
    var confirmPopup = $ionicPopup.confirm({
         title: 'ALERT',
         template: 'Are you sure you want to delete?'
      });
    var deletedItem=this.data._id;
     console.log(deletedItem);
     confirmPopup.then(function(res) {

     if(res) {
           //Logic to delete the item
            
      $http({
      method: 'POST',
      url: 'http://127.0.0.1:8080/deleteData',
      data: {data:deletedItem}
      }).then(function successCallback(response) 
       {

        $window.location.reload();
        console.log("SuccessofDeletion");

        });
         } else {
            console.log('Not sure!');
         }
      });
   };

           $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
          });


           $ionicModal.fromTemplateUrl('templates/modal1.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal1 = modal;
          });


          $scope.closeModal = function() {
              $scope.modal.hide();
              };


          $scope.closeModal1= function() {
          
              $scope.modal1.hide();

              $scope.insideSubmit();
          };

          $scope.showModal= function() {
          
              $scope.modal.show();
             

          };




           $scope.edit_data = function() {
          
           edit_data=this.data._id;
           console.log(edit_data);

            $scope.modals.titleInModal= this.data.title;
            $scope.modals.dataInModal=this.data.description;
            
            $scope.showModal();

          };

        $scope.undoData=function()
        {
          $scope.models.title="";
          $scope.models.data="";
        };

         $scope.undoEditData=function()
        {
          $scope.modals.titleInModal="";
          $scope.modals.dataInModal="";
        };
});
