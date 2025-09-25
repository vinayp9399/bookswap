import mongoose from 'mongoose'

const connectDB = async ()=>{
    try{
      await mongoose.connect('mongodb://localhost:27017/practicedb');
    //   console.log('Database connected!');
    }
    catch(err){
      console.log('Database not connected!');
    }
}

export default connectDB
