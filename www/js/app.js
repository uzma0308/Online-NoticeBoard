// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myCtrl=angular.module('starter', ['ionic']);
myCtrl.config(config);
myCtrl.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

//autosize(document.querySelectorAll('textarea'));

function config($stateProvider,$urlRouterProvider){
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
    })
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
    })
    .state('dashboard.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html"
          
        }
      }
    })
     .state('dashboard.help', {
      url: "/help",
      views: {
        'menuContent' :{
          templateUrl: "templates/help.html"
          
        }
      }
    })
    .state('dashboard.noticeBoard', {
      url: "/noticeBoard",
      views: {
        'menuContent' :{
          templateUrl: "templates/noticeBoard.html",
          controller: 'noticeBoardCtrl'
        }
      }
    })

    .state('dashboard.notice', {
      url: "/notice",
      views: {
        'menuContent' :{
          templateUrl: "templates/notice.html",
          controller: 'noticeCtrl'
          
        }
      }
    })
    .state('dashboard.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: 'profileCtrl'
          
        }
      }
    });
    $urlRouterProvider.otherwise('/login');
}