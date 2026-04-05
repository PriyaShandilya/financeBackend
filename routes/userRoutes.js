const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  getUsers,
  updateUserStatus
} = require("../controllers/userController");

// Get all users (Admin only)
router.get("/", auth, role("ADMIN"), getUsers);

// Activate / Deactivate user
router.put("/:id/status", auth, role("ADMIN"), updateUserStatus);

module.exports = router;