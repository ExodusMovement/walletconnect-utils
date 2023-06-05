/**
 * Source: https://git.coolaj86.com/coolaj86/local-storage.js/src/branch/local-storage/lib/localStorage.js
 */

/* eslint-disable */

(function() {
  "use strict";

  let db;

  function LocalStorage() {
  }
  db = LocalStorage;

  db.prototype.getItem = function(key) {
    if (this.mapping.has(key)) {
      return String(this.mapping.get(key));
    }
    return null;
  };

  db.prototype.setItem = function(key, val) {
    this.mapping.set(key, String(val));
  };

  db.prototype.removeItem = function(key) {
    this.mapping.delete(key);
  };

  db.prototype.clear = function() {
    this.mapping.clear();
  };

  db.prototype.key = function(i) {
    i = i || 0;
    return Array.from(this.mapping.keys())[i];
  };

  db.prototype.__defineGetter__("length", function() {
    return Array.from(this.mapping.keys()).length;
  });

  db.prototype.__defineGetter__("mapping", function() {
    if (typeof this._mapping !== "undefined") {
      return this._mapping;
    }
    const map = new Map();
    this._mapping = map;
    return map;
  });

  if (typeof global !== "undefined" && global.localStorage) {
    module.exports = global.localStorage;
  } else if (typeof window !== "undefined" && window.localStorage) {
    module.exports = window.localStorage;
  } else {
    module.exports = new LocalStorage();
  }
})();
