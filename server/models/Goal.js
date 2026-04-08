const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a goal name'],
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please declare a target amount for your goal'],
    },
    currentAmount: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
