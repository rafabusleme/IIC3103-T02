const btoa = require("btoa");

const createId = (string) => {
  const encodedId = btoa(string).slice(0, 22);
  return encodedId;
};

module.exports = {
  createId,
};
