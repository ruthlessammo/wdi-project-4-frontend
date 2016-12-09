angular.module('finalProject')
  .directive('soundcloud', soundcloud);

soundcloud.$inject = ['soundcloudService', '$sce'];
function soundcloud(soundcloudService, $sce) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      link: '@',
      width: '@',
      height: '@'
    },
    template: '<iframe width="{{ width }}" height="{{ height }}" src="{{ src }}" frameborder="0"></iframe>',
    link($scope) {
      const url = $sce.trustAsResourceUrl(`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudService.getCode($scope.link)}`);
      $scope.src = url;
    }
  };
}
