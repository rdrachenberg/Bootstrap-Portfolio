const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const auth_routes = require("./auth_routes");

// API Routes
router.use("/api", apiRoutes);
router.use("/api", auth_routes);

// // If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../src/layouts/home/home.js"));
// });

module.exports = router;
