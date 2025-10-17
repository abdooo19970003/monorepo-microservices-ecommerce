import mongoose from "mongoose";

let isConnected = false

export const ConnectOrderDb = async () => {
  if (!process.env.MONGO_URL)
    throw new Error('MONGO_URL is not defined')
  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }
  try {

    await mongoose.connect(process.env.MONGO_URL!)
    isConnected = true
    console.log('MongoDB connected')
  } catch (err) {
    console.log(err)
    throw err
  }
}