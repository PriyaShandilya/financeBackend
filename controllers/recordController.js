const Record = require("../models/Record");

exports.createRecord = async (req, res) => {
 const record = await Record.create({
  ...req.body,
  user: req.user.id
});
  res.json("Record created succcessfully", record);
};
exports.getRecords = async (req, res) => {
  try {
    let filter = {};

    // ADMIN and ANALYST see everything. 
    // VIEWER (or anyone else) only sees their own.
    const hasFullAccess = ["ADMIN", "ANALYST"].includes(req.user.role);

    if (!hasFullAccess) {
      filter.user = req.user.id;
    }

    // Now, let's add the filtering for the Analyst to use
    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.type) { // e.g., 'income' or 'expense'
      filter.type = req.query.type;
    }

    const records = await Record.find(filter).sort({ date: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Update fields
    record.amount = req.body.amount || record.amount;
    record.type = req.body.type || record.type;
    record.category = req.body.category || record.category;
    record.date = req.body.date || record.date;
    record.notes = req.body.notes || record.notes;

    await record.save();

    res.json(record);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Update fields
    record.amount = req.body.amount || record.amount;
    record.type = req.body.type || record.type;
    record.category = req.body.category || record.category;
    record.date = req.body.date || record.date;
    record.notes = req.body.notes || record.notes;

    await record.save();

    res.json(record);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await record.deleteOne();

    res.json({ message: "Record deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};