angular
  .module('finalProject')
  .controller('CommentsNewController', CommentsNewController)
  .controller('CommentsIndexController', CommentsIndexController);

CommentsNewController.$inject = ['$http', 'Comment', '$state'];

function CommentsNewController($http, Comment, $state) {
  const comments = this;
  comments.all = [];
  comments.addComment = addComment;
  comments.newComment = {};
  comments.trackId = $state.params.trackId;

  function addComment() {
    comments.newComment.trackId = $state.params.trackId;
    Comment.save(comments.newComment)
      .then((data) => {
        comments.all.push(data);
        comments.newComment = {};
        $state.go('commentsIndex', { trackId: $state.params.trackId });
      });
  }

}

CommentsIndexController.$inject = ['Comment', '$state'];
function CommentsIndexController(Comment, $state){
  const comments = this;
  comments.all = [];

  comments.trackId = $state.params.trackId;

  function getComments() {
    Comment.query($state.params)
      .then((data) => {
        comments.all = data;
      });
  }

  getComments();
}
