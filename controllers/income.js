const IncomeSchema = require("../models/incomeModel");

exports.addIncome = (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new IncomeSchema({
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
    res.status(200).json({ message: 'Income Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  console.log(income);
};

exports.getIncome = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        
    }
}
exports.deleteIncome = async (req, res) =>{
    const{id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({ message: 'Income Deleted' });
        })
        .catch((err)=> {
            res.status(500).json({ message: 'Server Error' });
        })
}