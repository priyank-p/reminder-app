/*
  This module is meant to be uses as global
  enviorment variable, properties set there
  would be avaliable to anywhere else in codebase
  though not through global but by requiring this module.
*/

module.exports = {
  setEnv(name, value) {
    this[name] = value;
  }
};
