"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function WhitelistSrc(e){e.resourceUrlWhitelist(["self","https://w.soundcloud.com/**"])}function RegisterController(e,t){function r(){e.signup(o.user).then(function(){t.go("login")})}var o=this;o.user={},o.submit=r}function LoginController(e,t){function r(){e.login(o.credentials).then(function(){t.go("usersIndex")})}var o=this;o.credentials={},o.submit=r}function Comment(e,t){return new e(t+"/comments/:id",{id:"@id"},{update:{method:"PUT"}})}function CommentsNewController(e,t,r){function o(){n.newComment.trackId=r.params.trackId,t.save(n.newComment).then(function(e){n.all.push(e),n.newComment={},r.go("commentsIndex",{trackId:r.params.trackId})})}var n=this;n.all=[],n.addComment=o,n.newComment={},n.trackId=r.params.trackId}function CommentsIndexController(e,t){function r(){e.query(t.params).then(function(e){o.all=e})}var o=this;o.all=[],o.trackId=t.params.trackId,r()}function MainController(e,t,r){function o(){e.logout().then(function(){t.go("usersIndex")})}function n(r,o){l.message=null,!e.isAuthenticated()&&s.includes(o.name)&&(r.preventDefault(),t.go("login"),l.message="You must be logged in to go there!")}var l=this;l.isLoggedIn=e.isAuthenticated,l.message=null;var s=["usersEdit"];r.$on("$stateChangeStart",n),l.logout=o}function Router(e,t){e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("tracksIndex",{url:"/tracks",templateUrl:"/templates/tracksIndex.html",controller:"TracksIndexController as tracksIndex"}).state("tracksShow",{url:"/tracks/:id",templateUrl:"/templates/tracksShow.html",controller:"TracksShowController as tracksShow"}).state("tracksEdit",{url:"/tracks/:id/edit",templateUrl:"/templates/tracksEdit.html",controller:"TracksEditController as tracksEdit"}).state("about",{url:"/about",templateUrl:"/templates/about.html"}),t.otherwise("/tracks")}function soundcloud(){return{restrict:"E",replace:!0,scope:{id:"@",width:"@",height:"@"},template:'<iframe src="{{ src }}" width="{{ width }}" height="{{ height }}" scrolling="no" frameborder="no"></iframe>',link:function(e){e.src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+e.id+"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"}}}function soundcloudService(){function e(e){console.log("URL",e);var t=null,r=e.match(/tracks\/([0-9]+)/);return r&&(t=r[1]),console.log("CODE",t),t}this.getCode=e}function Track(e,t){return new e(t+"/tracks/:id",{id:"@id"},{update:{method:"PUT"}})}function TracksIndexController(e,t,r,o){function n(e){var t=l.currentUser.like_ids.indexOf(e.id);t>-1?(l.currentUser.like_ids.splice(t,1),e.likes--):(l.currentUser.like_ids.push(e.id),e.likes++),o.update({id:l.currentUser.id},l.currentUser,function(t){var r=l.all.indexOf(e);l.all[r].likes=e.likes})}var l=this;r.isAuthenticated()&&(l.currentUser=o.get({id:r.getPayload().id})),l.all=e.query(),l.addLike=n}function TracksNewController(e,t){function r(){e.save(o.track,function(){t.go("tracksIndex")})}var o=this;o.track={},o.create=r}function TracksShowController(e,t,r,o,n){function l(){r.save(i.newComment,function(){t.reload()})}function s(){var e=i.currentUser.like_ids.indexOf(i.track.id);e>-1?(i.currentUser.like_ids.splice(e,1),i.track.likes--):(i.currentUser.like_ids.push(i.track.id),i.track.likes++),n.update({id:i.currentUser.id},i.currentUser,function(){})}function a(){i.track.$remove(function(){t.go("tracksIndex")})}var i=this;o.isAuthenticated()&&(i.currentUser=n.get({id:o.getPayload().id})),i.track=e.get(t.params),i.newComment={track_id:t.params.id},i.createComment=l,i.addLike=s,i.delete=a,i.isLoggedIn=o.isAuthenticated}function TracksEditController(e,t,r){function o(){e.update({id:n.track.id},n.track,function(){t.go("tracksShow",t.params)})}var n=this;n.track=e.get(t.params),n.update=o,n.isLoggedIn=r.isAuthenticated}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,r,o){function n(){s.user.$remove(function(){t.go("usersIndex")})}function l(){o.save(s.newTrack,function(){t.reload()})}var s=this;s.user=e.get(t.params),s.newTrack={},s.createTrack=l,s.delete=n,s.isLoggedIn=r.isAuthenticated}function UsersEditController(e,t,r){function o(){e.update({id:n.user.id},n.user,function(){t.go("usersShow",t.params)})}var n=this;n.user=e.get(t.params),n.update=o,n.isLoggedIn=r.isAuthenticated}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","http://localhost:3000/api").config(Auth).config(WhitelistSrc),Auth.$inject=["$authProvider","API_URL"],WhitelistSrc.$inject=["$sceDelegateProvider"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").factory("Comment",Comment),Comment.$inject=["$resource","API_URL"],angular.module("finalProject").controller("CommentsNewController",CommentsNewController).controller("CommentsIndexController",CommentsIndexController),CommentsNewController.$inject=["$http","Comment","$state"],CommentsIndexController.$inject=["Comment","$state"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").directive("soundcloud",soundcloud),angular.module("finalProject").service("soundcloudService",soundcloudService),angular.module("finalProject").factory("Track",Track),Track.$inject=["$resource","API_URL"],angular.module("finalProject").controller("TracksIndexController",TracksIndexController).controller("TracksShowController",TracksShowController).controller("TracksEditController",TracksEditController),TracksIndexController.$inject=["Track","$state","$auth","User"],TracksNewController.$inject=["Track","$state"],TracksShowController.$inject=["Track","$state","Comment","$auth","User"],TracksEditController.$inject=["Track","$state","$auth"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth","Track"],UsersEditController.$inject=["User","$state","$auth"];
//# sourceMappingURL=app.js.map
