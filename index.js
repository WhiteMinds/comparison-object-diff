function comparisonObject (objLast, objNew) {
  var change = {}, add = {}, del = {}, k;

  for (k in objLast) {
    if (!objLast.hasOwnProperty(k))
      continue;

    if (!objNew.hasOwnProperty(k)) { // deleted
      del[k] = true;
      continue;
    }

    if (typeof objLast[k] === 'object' && typeof objNew[k] === 'object') { // deep
      var ret = comparisonObject(objLast[k], objNew[k]);
      if (Object.keys(ret.change).length > 0) change[k] = ret.change;
      if (Object.keys(ret.add).length > 0) add[k] = ret.add;
      if (Object.keys(ret.del).length > 0) del[k] = ret.del;
      continue;
    }

    if (objLast[k] !== objNew[k]) { // changed
      change[k] = objNew[k];
    }
  }

  for (k in objNew) {
    if (!objNew.hasOwnProperty(k))
      continue;

    if (!objLast.hasOwnProperty(k)) { // added
      add[k] = objNew[k];
    }
  }

  return { change: change, add: add, del: del };
}

function updateObjectFromDiff(objLast, diff) {
  mergeChange(objLast, diff.change);
  mergeAdd(objLast, diff.add);
  mergeDel(objLast, diff.del);

  function mergeChange (obj, diff) {
    for (var k in diff) {
      if (!diff.hasOwnProperty(k))
        continue;

      if (typeof diff[k] === 'object') { // deep
        mergeChange(obj[k], diff[k]);
        continue;
      }

      obj[k] = diff[k]; // update change
    }
  }

  function mergeAdd (obj, diff) {
    for (var k in diff) {
      if (!diff.hasOwnProperty(k))
        continue;

      if (obj.hasOwnProperty(k)) { // deep
        mergeAdd(obj[k], diff[k]);
        continue;
      }

      obj[k] = diff[k]; // update add
    }
  }

  function mergeDel (obj, diff) {
    for (var k in diff) {
      if (!diff.hasOwnProperty(k))
        continue;

      if (typeof diff[k] === 'object') { // deep
        mergeDel(obj[k], diff[k]);
        continue;
      }

      delete obj[k]; // update delete
    }
  }
}

module.exports.comparisonObject = comparisonObject;
module.exports.updateObjectFromDiff = updateObjectFromDiff;
