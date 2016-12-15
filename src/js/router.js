angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider ) {
  $stateProvider

  //USER  REGISTER AND LOGIN ROUTES
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/templates/usersIndex.html',
    controller: 'UsersIndexController as usersIndex'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/templates/register.html',
    controller: 'RegisterController as register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login.html',
    controller: 'LoginController as login'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: '/templates/usersShow.html',
    controller: 'UsersShowController as usersShow'
  })
  .state('usersEdit', {
    url: '/users/:id/edit',
    templateUrl: '/templates/usersEdit.html',
    controller: 'UsersEditController as usersEdit'
  })

  //TRACKS ROUTES
  .state('tracksIndex', {
    url: '/tracks',
    templateUrl: '/templates/tracksIndex.html',
    controller: 'TracksIndexController as tracksIndex'
  })
  .state('tracksShow', {
    url: '/tracks/:id',
    templateUrl: '/templates/tracksShow.html',
    controller: 'TracksShowController as tracksShow'
  })
  .state('tracksEdit', {
    url: '/tracks/:id/edit',
    templateUrl: '/templates/tracksEdit.html',
    controller: 'TracksEditController as tracksEdit'
  })

  //OTHER ROUTES
  // .state('home', {
  //   url: '/',
  //   templateUrl: '/templates/home.html'
  // })
  .state('about', {
    url: '/about',
    templateUrl: '/templates/about.html'
  });

  $urlRouterProvider.otherwise('login');
}
