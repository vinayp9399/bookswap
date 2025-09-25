import mongoose from 'mongoose'

const connectDB = async ()=>{
    try{
      await mongoose.connect('mongodb+srv://vinayp9399:mechanic%4093@vinaycluster.03uocxi.mongodb.net/bookswap?retryWrites=true&w=majority&appName=VinayCluster');
    //   console.log('Database connected!');
    }
    catch(err){
      console.log('Database not connected!');
    }
}

export default connectDB
