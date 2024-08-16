import IncomeSchema from "../models/IncomeModel.js";
import User from "../models/userModel.js";

export const addIncome = async (req, res) => {
  const { username, title, amount, category, description, date } = req.body;
//   console.log(username);
  const userFound = await User.findOne({ username: username });
  const income = IncomeSchema({
    user: userFound._id,
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
    // res.status(200).json(income)
    // console.log(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getIncome = async (req, res) => {
  const { username } = req.query;
  const userFound = await User.findOne({ username: username });
  try {
    const incomes = await IncomeSchema.find({ user: userFound._id }).sort({createdAt: -1,});
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};

export const changeIncome = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { title, amount, category, description, date } = req.body;

  const updatedIncome = {
    title,
    amount,
    category,
    description,
    date,
  };
  console.log(title);
  IncomeSchema.findByIdAndUpdate(id, updatedIncome, { new: true })
    .then((updatedIncome) => {
      res.status(200).json({ message: "Income Editted" });
      console.log(updatedIncome);
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
      console.log(err);
    });
};
