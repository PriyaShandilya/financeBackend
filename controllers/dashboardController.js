const mongoose = require("mongoose");
const Record = require("../models/Record");

const getSummary = async (req, res) => {
  try {
    let filter = {};

    // 1. ALLOW ANALYSTS TO SEE EVERYTHING
    // If not ADMIN AND not ANALYST → then restrict to own records
    const hasFullAccess = ["ADMIN", "ANALYST"].includes(req.user.role);
    
    if (!hasFullAccess) {
      filter.user = new mongoose.Types.ObjectId(req.user.id);
    }

    // 2. Fetch records based on the filter
    const records = await Record.find(filter);

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryMap = {};
    const monthlyMap = {};

    records.forEach((rec) => {
      // Calculate Totals
      if (rec.type === "INCOME") totalIncome += rec.amount;
    if (rec.type === "EXPENSE") {
    categoryMap[rec.category] = (categoryMap[rec.category] || 0) + rec.amount;
}

      // Category totals (Fix: Track income vs expense per category)
      if (!categoryMap[rec.category]) categoryMap[rec.category] = 0;
      // We subtract expenses so the analyst sees "Net" per category
      categoryMap[rec.category] += rec.type === "INCOME" ? rec.amount : -rec.amount;

      // Monthly trends
      const date = new Date(rec.date);
      const monthName = date.toLocaleString('default', { month: 'short' }); 
      if (!monthlyMap[monthName]) monthlyMap[monthName] = 0;
      monthlyMap[monthName] += rec.type === "INCOME" ? rec.amount : -rec.amount;
    });

    const categoryTotals = Object.entries(categoryMap).map(([key, value]) => ({
      category: key,
      total: value
    }));

    const monthly = Object.entries(monthlyMap).map(([month, total]) => ({
      month,
      total
    }));

    // Recent Records (Limited to the filter)
    const recent = await Record.find(filter)
      .sort({ date: -1 })
      .limit(5);

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryTotals,
      recent,
      monthly
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSummary };