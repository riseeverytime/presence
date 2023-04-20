function isStringifiedJSON(maybeJsonString) {
  try {
    JSON.parse(maybeJsonString);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  isStringifiedJSON,
}
