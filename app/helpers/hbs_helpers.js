module.exports = {
  iso_string(str) {
    return str.replace(" ", "T") + "Z";
  },
};
