angular.module('finalProject', ['ngResource', 'ui.router', 'satellizer'])
.constant('API_URL', window.location.hostname === 'localhost' ? 'https://localhost:3000' : '//ruthlessmuzic.herokuapp.com')
  .config(Auth)
  .config(WhitelistSrc);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.loginUrl = `${API_URL}/login`;
  $authProvider.signupUrl = `${API_URL}/register`;

  $authProvider.tokenPrefix = '';
}

WhitelistSrc.$inject = ['$sceDelegateProvider'];
function WhitelistSrc($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://w.soundcloud.com/**'
  ]);
}
