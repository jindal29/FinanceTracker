const Transaction = require('../models/Transaction');
const Goal = require('../models/Goal');
const mongoose = require('mongoose');

// @desc    Get dashboard summary data
// @route   GET /api/v1/dashboard
// @access  Private
exports.getDashboardSummary = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Run all queries in parallel for performance
    const [totalsAgg, recentTransactions, goals] = await Promise.all([
      // Aggregate income & expense totals
      Transaction.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: '$type',
            sum: { $sum: '$amount' }
          }
        }
      ]),
      // Get last 5 transactions
      Transaction.find({ userId: req.user.id })
        .sort({ date: -1 })
        .limit(5),
      // Get all goals for summary
      Goal.find({ userId: req.user.id })
    ]);

    // Parse aggregation results
    let totalIncome = 0;
    let totalExpense = 0;

    totalsAgg.forEach((item) => {
      if (item._id === 'income') totalIncome = item.sum;
      if (item._id === 'expense') totalExpense = item.sum;
    });

    const totalBalance = totalIncome - totalExpense;

    // Goals summary
    const totalGoals = goals.length;
    const completedGoals = goals.filter(
      (g) => g.currentAmount >= g.targetAmount
    ).length;

    res.status(200).json({
      success: true,
      data: {
        totalBalance,
        totalIncome,
        totalExpense,
        recentTransactions,
        goals: {
          total: totalGoals,
          completed: completedGoals
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
