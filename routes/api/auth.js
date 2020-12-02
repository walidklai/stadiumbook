const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/UserModel");

const router = express.Router();

//@route /api/auth
//method GET
//private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    /* if (!user)
     return res.status(404).json({ msg: "User not found" }); */
    res.json(user);
  } catch (err) {
    console.log(err.message);
    if (err.kind !== 200)
      return res.status(404).json({ msg: "User not found" });
    res.status(501).json({ msg: "Server error" });
  }
});

//@route /api/auth
//method POST
//public

router.post(
  "/",
  [
    check("email", "Wrong credentials").isEmail(),
    check("password", "Wrong credentials").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) res.status(404).json({errors:[ {msg: "Wrong credentials"}] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({errors:[ {msg: "Wrong credentials"}] });
      const payload = {
        user: {
          id: user.id,
          role:user.role
        },
      };
      await jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json([{ msg: "Server error" }]);
    }
  }
);

module.exports = router;
