(function(window, JSON, undefined) {

  var NAMESPACE = 'channel-toggle-interface';

  // private

  function _get(sItemName) {

    var data;

    data = window.localStorage.getItem(NAMESPACE + sItemName);

    if (data) {
      return JSON.parse(data);
    } else {
      return undefined;
    }

  }

  function _set(sItemName, sValue) {
    return window.localStorage.setItem(NAMESPACE + sItemName, JSON.stringify(sValue));
  }

  // public

  var storage = {};

  storage.saveSession = function(sSetName, sSceneId, sCellData) {

    var data;

    data = {
      cells: sCellData,
      set: sSetName,
      scene: sSceneId
    };

    return _set(sSetName + sSceneId, data);

  };

  storage.loadSession = function(sSetName, sSceneId) {
    return _get(sSetName + sSceneId);
  };

  window.storage = window.storage || storage;

})(window, window.JSON);
