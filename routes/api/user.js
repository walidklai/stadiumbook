const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/UserModel");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

const router = express.Router();

//@route /api/user
//method POST
//public

router.post(
  "/",
  [
    check("name", "Please fill the (name) field").not().isEmpty(),
    check("email", "please type a correct Email address").isEmail(),
    check("cin", "Please type a correct CIN number").isNumeric().isLength({
      min: 8,
      max: 8,
    }),
    check("password", "Please type a correct password of minimum 8 characters")
      .exists()
      .isLength({
        min: 8,
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { name, email, cin, password } = req.body;
    try {
      let user =
        (await User.findOne({ email })) || (await User.findOne({ cin }));
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });

      user = new User({
        name,
        email,
        cin,
        password,
        role: "user",
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json([{ msg: "User registered" }]);
    } catch (err) {
      console.log(err.message);
      res.status(500).json([{ msg: "Server error" }]);
    }
  }
);

router.get("/", auth, admin("admin"), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/", auth, admin("admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
