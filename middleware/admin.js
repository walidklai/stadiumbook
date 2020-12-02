module.exports = function (role) {
  console.log(role);
  return async function (req, res, next) {
    console.log(req.user.role);
    if (!(role == req.user.role)) {
      return res.status(401).json({ msg: "admin only" });
    } else {
      next();   
    }
  };
};
