angular.module('finalProject')
  .controller('TracksIndexController', TracksIndexController)
  .controller('TracksShowController', TracksShowController)
  .controller('TracksEditController', TracksEditController);


TracksIndexController.$inject = ['Track'];
function TracksIndexController(Track) {
  const tracksIndex = this;

  tracksIndex.all = Track.query();
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

TracksShowController.$inject = ['Track', '$state', 'Comment', '$auth'];
function TracksShowController(Track, $state, Comment, $auth) {
  const tracksShow = this;

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
