import mongoose from "mongoose"

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connected Sucessfully to ${process.env.MONGO_URL}`)
    } catch (error) {
        console.log('Database Connection Error',error);
    }
}

export default db;