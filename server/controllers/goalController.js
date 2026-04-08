const Goal = require('../models/Goal');

// @desc    Get all goals for a user
// @route   GET /api/v1/goals
// @access  Private
exports.getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: goals.length, data: goals });
  } catch (error) {
    next(error);
  }
};

// @desc    Add goal
// @route   POST /api/v1/goals
// @access  Private
exports.addGoal = async (req, res, next) => {
  try {
    const { name, targetAmount, currentAmount } = req.body;
    const goal = await Goal.create({
      name,
      targetAmount,
      currentAmount: currentAmount || 0,
      userId: req.user.id
    });
    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    next(error);
  }
};

// @desc    Update goal
// @route   PUT /api/v1/goals/:id
// @access  Private
exports.updateGoal = async (req, res, next) => {
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, error: 'No goal found' });
    if (goal.userId.toString() !== req.user.id) return res.status(401).json({ success: false, error: 'Not authorized' });

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete goal
// @route   DELETE /api/v1/goals/:id
// @access  Private
exports.deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, error: 'No goal found' });
    if (goal.userId.toString() !== req.user.id) return res.status(401).json({ success: false, error: 'Not authorized' });

    await goal.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
