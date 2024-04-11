const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/users.js");

module.exports = {
  create: (data) => {
    let token = jwt.sign({ email: data.email, id: data._id }, JWT_SECRET, {
      expiresIn: "1hr",
    });
    return token;
  },
  verify: (req, res, next) => {
    const token = req.headers["bearerauth"];
    const dateNow = new Date();
    if (!token) {
      return res.status(401).send({ msg: "Usuario sin autorizacion" });
    }
    jwt.verify(token, JWT_SECRET, async (err, decode) => {
      if (err) return res.status(401).send({ msg: "Token no valido" });
      if (decode.exp < dateNow.getTime() / 1000) {
        return res.status(401).send({ msg: "Tu sesión expiro" });
      }
      req.loginUser = await User.findById(decode._id);
      next();
    });
  },
};
