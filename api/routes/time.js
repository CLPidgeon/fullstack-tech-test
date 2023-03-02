var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  message = {
    epoch: Date.now(),
  };
  res.json(message);
});

module.exports = router;
