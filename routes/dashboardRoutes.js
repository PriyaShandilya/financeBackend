const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getSummary } = require("../controllers/dashboardController");

router.get("/summary", auth, role("VIEWER", "ANALYST", "ADMIN"), getSummary);
module.exports = router; 