const express = require("express");
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");

const validate = require("../middleware/validate");
const { recordSchema } = require("../utils/validators/recordValidator");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

//  View records  Analyst + Admin
router.get("/", auth, role("ANALYST", "ADMIN"), getRecords);

// ➕ Create → Admin only
router.post("/", auth, role("ADMIN"), validate(recordSchema), createRecord);

//Update Admin only
router.put("/:id", auth, role("ADMIN"), updateRecord);

// Delete Admin only
router.delete("/:id", auth, role("ADMIN"), deleteRecord);

module.exports = router;