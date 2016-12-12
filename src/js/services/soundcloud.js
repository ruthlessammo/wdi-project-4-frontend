angular.module('finalProject')
  .service('soundcloudService', soundcloudService);

function soundcloudService() {
  function getCode(url) {
    console.log('URL', url);
    let code = null;
    const match = url.match(/tracks\/([0-9]+)/);
    if(match) code = match[1];
    console.log('CODE', code);
    return code;
  }
  this.getCode = getCode;
}
