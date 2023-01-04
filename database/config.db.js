import mongoose from "mongoose";

export const dbConnection = async () => {
    mongoose.set('strictQuery', true); // Warns if you try to query a field that doesn't exist in the schema
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            throw new Error("Error a la hora de iniciar la base de datos");
        } else {
            console.log("Connected to database");
        }
    });
}