import mongoose from "mongoose";

const connectdb = async (): Promise<void> => {
      try {
         await mongoose.connect(process.env.MONGO_URL as string )
         console.log("mongodb connected")
      } catch (error : any) {
            console.log(error.message)
      }
}
export default connectdb