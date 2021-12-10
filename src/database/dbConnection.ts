import mongoose from 'mongoose';

const initDB = async () => {
    await mongoose.connect(process.env.DB_URL as string)
}

export default initDB;