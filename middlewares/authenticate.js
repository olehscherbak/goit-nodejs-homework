const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log(token);
  if (bearer !== "Bearer") {
    console.log("Bearer");
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log(id);
    console.log(User);

    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      console.log("user");
      next(HttpError(401));
    }
    next();
  } catch (_) {
    console.log("token");
    next(HttpError(401));
  }
};

module.exports = authenticate;
