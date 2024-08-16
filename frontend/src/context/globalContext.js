import React, { useContext, useState } from "react"
import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config();

const URL=process.env.REACT_APP_URL_API;
// const URL="";

const BASE_URL = URL+"/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [editi,setEditi]=useState(false)
    const [edit_data, setEditData] = useState(null);
    const [edite,setEdite]=useState(false)
    const [edit_data_e, setEditDatae] = useState(null);
    const username = localStorage.getItem("username");
    // alert(username);
    //calculate incomes
    const addIncome = async (income) => {
        const {title, amount, category, description, date}  = income
        console.log(username,title, amount, category, description, date);
        const response = await axios.post(`${BASE_URL}add-income`, 
        {
            username,
            title,
            amount,
            category,
            description,
            date,
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        console.log(response); 
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`,{params:{"username":username}})
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const editIncome = async (id) => {
        try{
            const response = await axios.get(`${BASE_URL}get-incomes`,{params:{"username":username}})
            const random_data=response.data.find(item => item._id === id);
            setEditi(true);
            if (random_data) {
                console.log(random_data);
                setEditData(random_data);
            } else {
            console.log("Data with the specified ID not found.");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const editExpense = async (id) => {
        try{
            const response = await axios.get(`${BASE_URL}get-expenses`,{params:{"username":username}})
            const random_data=response.data.find(item => item._id === id);
            setEdite(true);
            if (random_data) {
                console.log(random_data);
                setEditDatae(random_data);
            } else {
            console.log("Data with the specified ID not found.");
            }
        }
        catch(err){

            console.log(err);
        }
        // const response = await axios.get(`${BASE_URL}get-expenses`)
        // const random_data=response.data.find(item => item._id === id);
        // setEdite(true);
        // if (random_data) {
        //     console.log(random_data);
        //     setEditDatae(random_data);
        // } else {
        // console.log("Data with the specified ID not found.");
        // }
    }

    const changeIncome = async(id,income) =>{
        const response = await axios.patch(`${BASE_URL}/edit-income/${id}`,income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const changeExpense = async(id,expense) =>{
        const response = await axios.patch(`${BASE_URL}/edit-expense/${id}`,expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const {title, amount, category, description, date}  = income;
        // console.log(username,title, amount, category, description, date);
        const response = await axios.post(`${BASE_URL}add-expense`, 
        {
            username,
            title,
            amount,
            category,
            description,
            date,
        })
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`,{params:{"username":username}})
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            editIncome,
            editExpense,
            error,
            setError,
            setEditi,
            editi,
            edit_data,
            changeIncome,
            edit_data_e,
            setEdite,
            edite,
            changeExpense
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}