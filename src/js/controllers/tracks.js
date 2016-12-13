angular.module('finalProject')
.controller('TracksIndexController', TracksIndexController)
.controller('TracksShowController', TracksShowController)
.controller('TracksEditController', TracksEditController);


TracksIndexController.$inject = ['Track', '$state', '$auth', 'User'];
function TracksIndexController(Track, $state, $auth, User) {
  const tracksIndex = this;
  if($auth.isAuthenticated()) {
    tracksIndex.currentUser = User.get({id: $auth.getPayload().id});
  }

  tracksIndex.all = Track.query();
  tracksIndex.addLike = addLike;

  function addLike(track) {
    const index = tracksIndex.currentUser.like_ids.indexOf(track.id);
    if(index > -1) {
      tracksIndex.currentUser.like_ids.splice(index, 1);
      track.likes--;
    } else {
      tracksIndex.currentUser.like_ids.push(track.id);
      track.likes++;
    }
    User.update({id: tracksIndex.currentUser.id}, tracksIndex.currentUser, (user) => {
      $state.reload();
    });
  }

}

TracksNewController.$inject = ['Track', '$state'];
function TracksNewController(Track, $state) {
  const tracksNew = this;

  tracksNew.track = {};

  function create() {
    Track.save(tracksNew.track, () => {
      $state.go('tracksIndex');
    });
  }

  tracksNew.create = create;
}

TracksShowController.$inject = ['Track', '$state', 'Comment', '$auth', 'User'];
function TracksShowController(Track, $state, Comment, $auth, User) {
  const tracksShow = this;
  if($auth.isAuthenticated()) {
    tracksShow.currentUser = User.get({id: $auth.getPayload().id});
  }

  tracksShow.track = Track.get($state.params);

  tracksShow.newComment = {
    track_id: $state.params.id
  };

  function createComment() {
    Comment.save(tracksShow.newComment, () => {
      $state.reload();
    });
  }

  tracksShow.createComment = createComment;

  function addLike() {
    const index = tracksShow.currentUser.like_ids.indexOf(tracksShow.track.id);
    if(index > -1) {
      tracksShow.currentUser.like_ids.splice(index, 1);
      tracksShow.track.likes--;
    } else {
      tracksShow.currentUser.like_ids.push(tracksShow.track.id);
      tracksShow.track.likes++;
    }
    User.update({id: tracksShow.currentUser.id}, tracksShow.currentUser, () => {
    });
  }


  tracksShow.addLike = addLike;

  function deleteTrack() {
    tracksShow.track.$remove(() => {
      $state.go('tracksIndex');
    });
  }

  tracksShow.delete = deleteTrack;
  tracksShow.isLoggedIn = $auth.isAuthenticated;
}

TracksEditController.$inject = ['Track', '$state', '$auth'];
function TracksEditController(Track, $state, $auth) {
  const tracksEdit = this;

  tracksEdit.track = Track.get($state.params);

  function update() {
    Track.update({id: tracksEdit.track.id}, tracksEdit.track, () => {
      $state.go('tracksShow', $state.params);
    });
  }
  tracksEdit.update = update;
  tracksEdit.isLoggedIn = $auth.isAuthenticated;
}
