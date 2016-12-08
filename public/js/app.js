"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function r(){e.signup(o.user).then(function(){t.go("login")})}var o=this;o.user={},o.submit=r}function LoginController(e,t){function r(){e.login(o.credentials).then(function(){t.go("usersIndex")})}var o=this;o.credentials={},o.submit=r}function RegisterController(e,t){function r(){e.signup(o.user).then(function(){t.go("login")})}var o=this;o.user={},o.submit=r}function LoginController(e,t){function r(){e.login(o.credentials).then(function(){t.go("usersIndex")})}var o=this;o.credentials={},o.submit=r}function MainController(e,t,r){function o(){e.logout().then(function(){t.go("usersIndex")})}function n(r,o){l.message=null,!e.isAuthenticated()&&s.includes(o.name)&&(r.preventDefault(),t.go("login"),l.message="You must be logged in to go there!")}var l=this;l.isLoggedIn=e.isAuthenticated,l.message=null;var s=["usersEdit"];r.$on("$stateChangeStart",n),l.logout=o}function Router(e,t){e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("about",{url:"/about",templateUrl:"/templates/about.html"}),t.otherwise("/users")}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,r){function o(){n.user.$remove(function(){t.go("usersIndex")})}var n=this;n.user=e.get(t.params),n.delete=o,n.isLoggedIn=r.isAuthenticated}function UsersEditController(e,t,r){function o(){e.update({id:n.user.id},n.user,function(){t.go("usersShow",t.params)})}var n=this;n.user=e.get(t.params),n.update=o,n.isLoggedIn=r.isAuthenticated}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state","$auth"];
//# sourceMappingURL=app.js.map
