// const ExpenseSchema = require("../models/ExpenseModel")
import ExpenseSchema from "../models/ExpenseModel.js"
import User from "../models/userModel.js"

export const addExpense = async (req, res) => {
    const {username,title, amount, category, description, date}  = req.body;
    const userFound = await User.findOne({"username":username});
    const income = ExpenseSchema({
        user:userFound._id,
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    // console.log(income)
}

export const getExpense = async (req, res) =>{
    const {username} = req.query;
    const userFound = await User.findOne({"username":username});
    try {
        const incomes = await ExpenseSchema.find({"user":userFound._id}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

export const deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

export const changeExpense = async (req, res) =>{
    const {id} = req.params;
    console.log(req.body);
    const {title, amount, category, description, date}  = req.body

    const updatedExpense  = {
        title,
        amount,
        category,
        description,
        date
    }
    console.log(title);
    ExpenseSchema.findByIdAndUpdate(id,updatedExpense ,{ new: true })
        .then((updatedIncome ) =>{
            res.status(200).json({message: 'Income Editted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}