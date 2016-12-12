angular.module('finalProject')
  .directive('soundcloud', soundcloud);

function soundcloud() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      id: '@',
      width: '@',
      height: '@'
    },
    template: '<iframe src="{{ src }}" width="{{ width }}" height="{{ height }}" scrolling="no" frameborder="no" color=black_white></iframe>',
    link($scope) {
      $scope.src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${$scope.id}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`;
    }
  };
}
