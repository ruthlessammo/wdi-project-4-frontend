angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('usersIndex');
      });
  }

  const protectedStates = ['usersEdit'];

  function secureState(e, toState) {
    main.controllerName = toState.name;
    main.message = null;
    if ($auth.isAuthenticated()) {
      main.currentUserId = $auth.getPayload().id;
    }
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there!';
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;
}
