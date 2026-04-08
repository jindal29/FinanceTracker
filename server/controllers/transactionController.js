const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// @desc    Get all transactions for a user
// @route   GET /api/v1/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Private
exports.addTransaction = async (req, res, next) => {
  try {
    const { amount, category, type, date, description } = req.body;

    const transaction = await Transaction.create({
      amount,
      category,
      type,
      date,
      description,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    // Make sure user owns the transaction
    if (transaction.userId.toString() !== req.user.id) {
       return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard totals (income, expense, balance)
// @route   GET /api/v1/transactions/totals
// @access  Private
exports.getTransactionTotals = async (req, res, next) => {
  try {
    const agg = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: {
          _id: '$type',
          sum: { $sum: '$amount' }
      }}
    ]);
    
    let income = 0;
    let expense = 0;
    
    agg.forEach(m => {
       if(m._id === 'income') income = m.sum;
       if(m._id === 'expense') expense = m.sum;
    });

    const count = await Transaction.countDocuments({ userId: req.user.id });

    res.status(200).json({
      success: true,
      data: {
        income,
        expense,
        total: income - expense,
        count
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get expense data grouped by category
// @route   GET /api/v1/transactions/analytics/category
// @access  Private
exports.getTransactionCategoryGrouping = async (req, res, next) => {
  try {
     const agg = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id), type: 'expense' } },
      { $group: {
         _id: { $toLower: '$category' },
         total: { $sum: '$amount' }
      }},
      { $sort: { total: -1 } }
    ]);

    const formattedData = agg.map(m => ({
       name: m._id.charAt(0).toUpperCase() + m._id.slice(1),
       value: m.total
    }));

    res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Insights
// @route   GET /api/v1/transactions/insights
// @access  Private
exports.getAiInsights = async (req, res, next) => {
  try {
     const agg = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: {
          _id: { type: '$type', category: { $toLower: '$category' } },
          sum: { $sum: '$amount' }
      }}
    ]);

    let income = 0;
    let expense = 0;
    let highestExpenseCategory = '';
    let highestExpenseAmount = 0;

    agg.forEach(m => {
       if(m._id.type === 'income') {
           income += m.sum;
       }
       if(m._id.type === 'expense') {
           expense += m.sum;
           if (m.sum > highestExpenseAmount) {
               highestExpenseAmount = m.sum;
               highestExpenseCategory = m._id.category;
           }
       }
    });

    const insights = [];

    // Mock AI generation logic
    if (expense > income && income > 0) {
        insights.push({ id: 1, type: 'warning', message: "AI Analysis: You are currently spending more than you earn. Prioritize cutting non-essential expenses to avoid debt." });
    } else if (income > 0) {
        const savingRate = (((income - expense) / income) * 100).toFixed(1);
        insights.push({ id: 2, type: 'success', message: `AI Analysis: Excellent! Your savings rate is ${savingRate}%. Aim for at least 20% to build a solid financial cushion.` });
    } else {
        insights.push({ id: 3, type: 'info', message: "AI Analysis: Add some income transactions to receive a complete financial health report." });
    }

    if (highestExpenseAmount > 0) {
        const formattedCat = highestExpenseCategory.charAt(0).toUpperCase() + highestExpenseCategory.slice(1);
        insights.push({ id: 4, type: 'info', message: `AI Analysis: Your highest spending category is '${formattedCat}' at ₹${highestExpenseAmount}. Consider setting stricter budget limits for this specific sector.` });
    }

    res.status(200).json({
      success: true,
      data: insights
    });
  } catch (error) {
    next(error);
  }
};
