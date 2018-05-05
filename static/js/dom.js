function $(sel) {
  const els = document.querySelectorAll(sel);
  if (els && els.length == 1) {
    // return node instead of node list
    return els[0];
  }

  return els;
}

module.exports = {
  $
};
