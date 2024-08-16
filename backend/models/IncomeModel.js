import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"income"
    },
    date: {
        type: Date,
        required: true,
        trim: true,
        // default:new Date()
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true,
        // default:"New Income"
    },
}, {timestamps: true})


const income = mongoose.model('Income', IncomeSchema) // Income is collection name 
export default income;