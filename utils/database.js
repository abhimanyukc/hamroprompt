//but we dont have to make server running constantly ,have to make conn to db
//so fr that reason inside utils we make new file database.js
import mongoose from 'mongoose';

let isConnected = false; // track the connection
//utility function
export const connectToDB = async () => {
  //sets mongoose options
  mongoose.set('strictQuery', true);

  //to check if already connected
  if(isConnected) {
    // console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hamroprompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}