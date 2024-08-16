import { addExpense, getExpense, deleteExpense ,changeExpense} from '../controllers/expense.js';
import { addIncome, getIncome, deleteIncome, changeIncome } from '../controllers/income.js';
import express from 'express';

const router = express.Router();


// router.get(path,callBackfunction)
// router.post('/add-income', addIncome) // addIncome coming from controllers



router
    .post('/add-income', addIncome)
    .get('/get-incomes', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .get('/edit-expense/', changeIncome)
    .patch('/edit-income/:id',changeIncome)
    .patch('/edit-expense/:id',changeExpense);

export default router;

// module.exports = router // remove module from json file