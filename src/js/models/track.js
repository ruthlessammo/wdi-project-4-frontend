angular.module('finalProject')
  .factory('Track', Track);

Track.$inject = ['$resource', 'API_URL'];
function Track($resource, API_URL) {
  return new $resource(`${API_URL}/tracks/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
