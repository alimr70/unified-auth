const express = require("express");
const router = express.Router();

router.get(
  "/",
  (req, res) => {
    res.send("Welcome to Unified Authentication app!");
  }
);

module.exports = router;