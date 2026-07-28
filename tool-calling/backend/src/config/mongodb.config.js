import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { DbConfig } from "./app.config.js";

const mongoDbInit = async () => {
    try {
        await mongoose.connect(DbConfig.mongodb.url, {
            autoCreate: true,
            dbName: DbConfig.mongodb.dbName,
            autoIndex: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log("Mongodb connected successfully...");

    } catch (exception) {
        console.error("MongoDB Connection Error:", exception.message);
        console.error("Full error details:", exception);
        throw { code: 500, message: "Mongodb initialization error: " + exception.message, status: "MONGODB_CONNECTION_ERR" };
    }
};

export { mongoDbInit };
