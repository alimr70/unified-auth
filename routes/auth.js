const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { v4: uuid } = require("uuid");

/**
 * @route   POST auth/login
 * @desc    Login user
 * @access  Public
 */

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields!" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      throw Error("User does not exist! Please Sign Up!");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw Error(
        "The username or password you entered is not correct please try again!"
      );
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res.cookie("reto", refreshToken, {
      sameSite: "none",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
    });

    res.status(200).json({
      token: token,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ id: payload.id });
    res
      .status(200)
      .json({ username: user.username, image: user.image, token: token });
  } catch (err) {
    throw Error(err);
  }
});

/**
 * @route   POST auth/signup
 * @desc    Register new user
 * @access  Public
 */

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields!" });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      throw Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      throw Error("Something went wrong");
    }

    const hash = await bcrypt.hash(password, salt);
    if (!hash) {
      throw Error("Something went wrong");
    }

    const newUser = new User({
      id: uuid(),
      username,
      password: hash,
      image: null,
      registerMethod: "Username & Password",
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      throw Error("Couldn't save your data");
    }

    const token = jwt.sign({ id: savedUser.id }, process.env.SECRET);

    res.status(200).json({
      username: savedUser.username,
      image: savedUser.image,
      token: token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   GET auth/google
 * @desc    Register new user
 * @access  Public
 */
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

/**
 * @route   GET auth/google/callback
 * @desc    Login user
 * @access  Public
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/googleFailed" }),
  (req, res) => {
    // var responseHTML = `<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "${process.env.CLIENT_URL}");window.close();</script></html>`;
    // responseHTML = responseHTML.replace(
    //   "%value%",
    //   JSON.stringify({
    //     token: req.user,
    //   })
    // );
    // res.status(200).send(responseHTML);
    try {
      res.cookie("reto", req.user, {
        sameSite: "none",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
      });
      res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  }
);

/**
 * @route   GET auth/facebook
 * @desc    Register new user
 * @access  Public
 */
router.get("/facebook", passport.authenticate("facebook"));

/**
 * @route   GET auth/facebook/callback
 * @desc    Login user
 * @access  Public
 */
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/facebookFailed" }),
  (req, res) => {
    try {
      res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  }
);

/**
 * @route   GET auth/twitter
 * @desc    Register new user
 * @access  Public
 */
router.get("/twitter", passport.authenticate("twitter"));

/**
 * @route   GET auth/twitter/callback
 * @desc    Login user
 * @access  Public
 */
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/twitterFailed" }),
  (req, res) => {
    // var responseHTML = `<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "${process.env.CLIENT_URL}");window.close();</script></html>`;
    // responseHTML = responseHTML.replace(
    //   "%value%",
    //   JSON.stringify({
    //     token: req.user,
    //   })
    // );
    // res.status(200).send(responseHTML);
    try {
      res.cookie("reto", req.user, {
        sameSite: "none",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
      });
      res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  }
);

/**
 * @route   GET auth/getUser
 * @desc    GET loggedin user
 * @access  Private
 */

// router.get("/getuser", (req, res) => {
//   var responseHTML = `<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "${process.env.CLIENT_URL}");window.close();</script></html>`;
//   responseHTML = responseHTML.replace(
//     "%value%",
//     JSON.stringify({
//       token: req.user,
//     })
//   );
//   res.status(200).send(responseHTML);
// });

/**
 * @route   GET auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.get("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.cookie("reto", "", {
      sameSite: "none",
      httpOnly: true,
      maxAge: 0,
      secure: true,
    });
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

/**
 * @route   GET auth/refresh
 * @desc    Refresh user token
 * @access  Private
 */
router.get("/refresh", (req, res) => {
  if (req.cookies.reto) {
    jwt.verify(req.cookies.reto, process.env.SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json("Please Login!");
      } else {
        try {
          const user = await User.findById(decoded._id);

          const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: "1d",
          });
          const refreshToken = jwt.sign({ _id: user._id }, process.env.SECRET, {
            expiresIn: "1d",
          });

          res.cookie("reto", refreshToken, {
            sameSite: "none",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: true,
          });

          res.status(200).json({
            token: token,
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  } else {
    res.status(401).json({ msg: "Please Login!" });
  }
});

module.exports = router;
