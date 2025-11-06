import mongoose from 'mongoose';
let isConnected = false;
const connectDB = async () => {
    if (isConnected) {
        console.log('⚡ Using existing MongoDB connection');
        return;
    }
    try {
        const mongoUri = process.env.MONGO_URI;
        const dbName = process.env.MONGO_DB_NAME;
        if (!mongoUri) {
            throw new Error('❌ MONGO_URI not defined in .env');
        }
        const conn = await mongoose.connect(mongoUri, { dbName });
        isConnected = true;
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📂 Using Database: ${conn.connection.name}`);
    }
    catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map