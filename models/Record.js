const mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
  amount: Number,
  type: {
    type: String,
    enum: ["INCOME", "EXPENSE"]
  },
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
  category: String,
  date: Date,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);