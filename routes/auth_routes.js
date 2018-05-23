const router = require("express").Router();

router.get("/test"), (req, res) => {
    console.log("TEST SUCCESSFUL!!!");
}

module.exports = router;