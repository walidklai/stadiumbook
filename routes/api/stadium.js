const c = require("config");
const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Stadium = require("../../models/StadiumModel");
const User = require("../../models/UserModel");

const router = express.Router();

//@route /api/stadium
//method GET
//public

router.get("/", async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    res.json(stadiums);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//@route /api/stadium/:governorate
//method GET
//public

router.get("/search/:governorate", async (req, res) => {
  try {
    const stadiums = await Stadium.find({
      "address.governorate": req.params.governorate,
    });
    /* if(!stadiums.length>0) return res.status(404).json({msg:`No stadiums in ${req.params.governorate}`}) */
    res.json(stadiums);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//@route /api/stadium/me
//method GET
//private

router.get("/me", auth, async (req, res) => {
  try {
    const stadiums = await Stadium.find({ user: req.user.id });
    /* if (stadiums.length === 0)
      return res.status(400).json({ msg: "You dont have any stadium" }); */
    res.json(stadiums);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//@route /api/stadium/:id
//method GET
//public

router.get("/:id", async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    if (!stadium) return res.status(404).json({ msg: "Stadium not found" });
    res.json(stadium);
  } catch (err) {
    console.log(err.message);
    if (err.kind !== 200)
      return res.status(404).json({ msg: "Stadium not found" });
    res.status(500).json({ msg: "Server error" });
  }
});

//@route /api/stadium/:id
//method PUT
//private

router.put("/:id", auth, async (req, res) => {
  try {
    let stadium = await Stadium.findById(req.params.id);
    if (!stadium) return res.status(404).json({ msg: "Stadium not found" });

    const {
      name,
      length,
      width,
      governorate,
      city,
      street,
      description,
    } = req.body;

    checkStadium = await Stadium.findOne({ name });
    if (checkStadium)
      return res.status(400).json([{ msg: "Stadium already exists" }]);

    const stadiumFields = {};
    stadiumFields.user = req.user.id;
    stadiumFields.id = stadium._id;
    name ? (stadiumFields.name = name) : (stadiumFields.name = stadium.name);
    description
      ? (stadiumFields.description = description)
      : (stadiumFields.description = stadium.description);

    stadiumFields.area = {};
    length
      ? (stadiumFields.area.length = length)
      : (stadiumFields.area.length = stadium.area.length);
    width
      ? (stadiumFields.area.width = width)
      : (stadiumFields.area.width = stadium.area.width);
    stadiumFields.area.size =
      stadiumFields.area.width * stadiumFields.area.length;

    stadiumFields.address = {};
    governorate
      ? (stadiumFields.address.governorate = governorate)
      : (stadiumFields.address.governorate = stadium.address.governorate);
    city
      ? (stadiumFields.address.city = city)
      : (stadiumFields.address.city = stadium.address.governorate);
    street
      ? (stadiumFields.address.street = street)
      : (stadiumFields.address.street = stadium.address.street);

    stadiumFields.validated = false;
    console.log(stadiumFields);
    stadium = await Stadium.findOneAndUpdate(
      { user: req.user.id },
      { $set: stadiumFields },
      { new: true }
    );
    await stadium.save();
    res.json(stadium);
  } catch (err) {
    console.log(err.message);
    /* if (err.kind !== 200)
      return res.status(404).json({ msg: "Stadium not found" }); */
    res.status(500).json([{ msg: "Server error" }]);
  }
});

//@route /api/stadium/:id
//method DELETE
//private

router.delete("/:id", auth, async (req, res) => {
  try {
    const rmStadium = await Stadium.findById(req.params.id);
    if (!rmStadium) return res.status(404).json([{ msg: "Stadium not found" }]);

    await Stadium.findByIdAndDelete(req.params.id);
    res.json({ msg: "Stadium removed", rmStadium });
  } catch (err) {
    console.log(err.message);
    res.status(500).json([{ msg: "Server error" }]);
  }
});

//@route /api/stadium
//method POST
//private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Please fill the (name) field").not().isEmpty(),
      check("length", "Please type a correct length").isNumeric(),
      check("width", "Please type a correct width").isNumeric(),
      check("governorate", "Please fill the (governorate) field")
        .not()
        .isEmpty(),
      check("city", "Please fill the (city) field").not().isEmpty(),
      check("street", "Please fill the (street) field").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      name,
      length,
      width,
      governorate,
      city,
      street,
      description,
    } = req.body;
    try {
      const stadium = await Stadium.findOne({ name });
      if (stadium)
        return res.status(400).json([{ msg: "Stadium already exists" }]);
      let user = await User.findById(req.user.id);
      const newStadium = new Stadium({
        user: req.user.id,
        name,
        area: {
          length,
          width,
          size: length * width,
        },
        address: {
          governorate,
          city,
          street,
        },
        description,
        email: user.email,
        validated: false,
      });
      await newStadium.save();
      res.json(newStadium);
    } catch (err) {
      console.log(err.message);
      res.status(500).json([{ msg: "Server error" }]);
    }
  }
);

module.exports = router;
