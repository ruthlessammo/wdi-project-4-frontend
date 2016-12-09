angular.module('finalProject')
  .service('soundcloudService', soundcloudService);

function soundcloudService() {
  function getCode(url) {
    let code = null;
    const match = url.match(/tracks\/([0-9]+)/);
    if(match) code = match[1];
    return code;
  }
  this.getCode = getCode;
}
