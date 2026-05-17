import mongoose , {Document , Schema} from "mongoose";

export interface IUser extends Document{
      name : string;
      email : string;
      password : string;
      role : "admin" | "sales";
      createAt : Date;
      updatedAt : Date
}

const userSchema = new Schema<IUser>({
      name : {
            type : String , 
            required : [true , "Name is required"],
      },
      email : {
            type : String,
            required : [true , "Email is required"],
            unique : true
      },
      password : {
            type : String,
            required :[true , "Password is required"]
      },
      role : {
            type : String,
            enum : ["admin" , "sales"],
            default : "sales"
      }
}, {timestamps : true})

const User = mongoose.model<IUser>("user" , userSchema)
export default User;