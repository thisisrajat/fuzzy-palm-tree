module.exports = {
  if_gt(arr, length, options) {
    return arr.length > length ? options.fn(this) : options.inverse(this);
  },
  iso_string(str) {
    return str.replace(" ", "T") + "Z";
  },
};
