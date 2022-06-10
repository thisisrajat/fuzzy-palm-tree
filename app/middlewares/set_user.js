const User = require("../models/user");
/**
 * This middleware authenticates and sets the current
 * users on the request object.
 **/

const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100);

  const DB_USERS = 20;

  // Make sure we return IDs between 1 & 20
  return (randomNumber % DB_USERS) + 1;
};

const setUser = async (req, res, next) => {
  // FIXME: Use cookie and other logic authorization methods to
  // authenticate and set the user.

  const userId = getRandomId();

  const user = await User.findById(userId);

  req.currentUser = user;

  next();
};

module.exports = setUser;
