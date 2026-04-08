// @desc    Process chatbot message
// @route   POST /api/v1/chat
// @access  Private
exports.processChatMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required' });

    const msg = message.toLowerCase();
    
    // Default fallback
    let reply = "I'm your SmartFinance assistant! I can offer financial tips, guide you through app features, or help you navigate your dashboard.";

    // Rule-based logic
    if (msg.includes('use') || msg.includes('how') || msg.includes('start')) {
       reply = "Getting started is easy! Add your income and expenses in the 'Transactions' tab. Your 'Dashboard' will automatically update with an overview and AI insights based on your entries.";
    } else if (msg.includes('tip') || msg.includes('advice') || msg.includes('saving') || msg.includes('save')) {
       const tips = [
         "Here's a tip: Try the 50/30/20 rule! Allocate 50% to needs, 30% to wants, and 20% to savings.",
         "Financial Tip: Review your recurring subscriptions. Canceling services you haven't used in 3 months can easily boost your buffer.",
         "Advice: Automate your savings. Configure direct deposits so money moves to your savings account immediately on payday."
       ];
       reply = tips[Math.floor(Math.random() * tips.length)];
    } else if (msg.includes('navigate') || msg.includes('where') || msg.includes('find')) {
       reply = "Use the top navigation bar to move around. 'Dashboard' gives you a top-level summary, 'Transactions' lets you edit your ledger, 'Analytics' holds deep-dive charts, and 'Profile' is for your settings.";
    } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
       reply = "Hello there! How can I assist you with your personal finances today?";
    } else if (msg.includes('thank')) {
       reply = "You're very welcome! Let me know if you need any more help.";
    }

    // Simulate AI delay realistic timing
    setTimeout(() => {
       res.status(200).json({ success: true, data: { reply } });
    }, 600);

  } catch (err) {
    next(err);
  }
};
