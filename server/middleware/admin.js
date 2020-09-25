module.exports = function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send("Acces Denied!!!.The user is not an Admin");
  }
  next();
};
