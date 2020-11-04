// create an express router
const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("Yes, the /test route is Working");
});

module.exports = router;
