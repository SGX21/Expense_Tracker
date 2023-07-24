const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Please enter the correct amount' });
    }
    income.save()
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        
    }
}
exports.deleteExpense = async (req, res) =>{
    const{id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({ message: 'Expense Deleted' });
        })
        .catch((err)=> {
            res.status(500).json({ message: 'Server Error' });
        })
}