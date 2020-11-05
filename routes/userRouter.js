// create an express router
const router = require("express").Router();
// hash password
const bcrypt = require("bcryptjs");
// jason web token package
const jwt = require("jsonwebtoken");
// require userModel
const User = require("../models/userModel");

// testing a route
// router.get("/test", (req, res) => {
//   res.send("Yes, the /test route is Working");
// });

// get string & logging in a user
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validation
    // has the required data been entered?
    if (!email || !password || !passwordCheck)
      return res
        .status(400)
        .json({ msg: "You Have Not Entered All the Required Fields" });
    // check password length
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The Password has to be at Least 5 Characters Long" });
    // does password match the 2nd time entered?
    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Both Passwords Do Not Match" });
    const existingUser = await User.findOne({ email: email });
    // check if the email account already has an user account associated
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An Account Using this Email Address Already Exists" });
    if (!displayName) displayName = email;
    // hashing password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // testing the hashing
    // console.log(passwordHash);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    // save new user to the database
    const savedUser = await newUser.save();
    // saved user back to the frontend
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Not All Fields Have Been Populated" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        msg: "No Account with this Email Address has been Registered",
      });
    // match passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    // json web token attached to secret
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        emaIl: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
