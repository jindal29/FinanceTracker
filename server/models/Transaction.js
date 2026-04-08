const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Please specify transaction type (income or expense)'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a positive or negative amount'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please add a transaction date'],
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
