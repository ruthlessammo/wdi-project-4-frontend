angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);


UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state', '$auth', 'Track'];
function UsersShowController(User, $state, $auth, Track) {
  const usersShow = this;
  const payload = $auth.getPayload();
  const current_user = payload;

  usersShow.user = User.get($state.params);

  function checkUser() {
    console.log('usersShow.user.id', usersShow.user.id);
    console.log('current_user.id', current_user.id);
    if (usersShow.user.id === current_user.id) {
      return true;
    } else {
      return false;
    }
  }

  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }

  usersShow.newTrack = {};
  function createTrack() {
    Track.save(usersShow.newTrack, () => {
      $state.reload();
    });
  }

  usersShow.checkUser = checkUser;
  usersShow.createTrack = createTrack;
  usersShow.delete = deleteUser;
  usersShow.isLoggedIn = $auth.isAuthenticated;
}

UsersEditController.$inject = ['User', '$state', '$auth'];
function UsersEditController(User, $state, $auth) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);

  function update() {
    User.update({id: usersEdit.user.id}, usersEdit.user, () => {
      $state.go('usersShow', $state.params);
    });
  }
  usersEdit.update = update;
  usersEdit.isLoggedIn = $auth.isAuthenticated;
}
