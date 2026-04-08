const express = require('express');
const { getTransactions, addTransaction, deleteTransaction, getTransactionTotals, getTransactionCategoryGrouping, getAiInsights } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/totals').get(protect, getTransactionTotals);
router.route('/analytics/category').get(protect, getTransactionCategoryGrouping);
router.route('/insights').get(protect, getAiInsights);

router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router.route('/:id')
  .delete(protect, deleteTransaction);

module.exports = router;
