var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  message = {
    epoch: Math.round(Date.now() / 1000),
  };
  res.json(message);
});

module.exports = router;
