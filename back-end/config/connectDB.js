import mongoose from "mongoose";

export const connectDB = async () => {
  try {

    // console.log(process.env.MONGO_URL);

    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected : ${conn.connection.host}`);

  } catch (err) {
    console.error(`Error : ${err.message}`);
    process.exit(1);
  }
};
