import mongoose , {Document , Schema} from "mongoose";

export interface ILead extends Document{
      name :string;
      email : string;
      status : "new" | "contacted" | "qualified" | "lost";
      source: "website" | "instagram" | "referral"| "other";
      createdBy : mongoose.Types.ObjectId;
      createdAt : Date;
      updatedAt : Date;
}

const leadSchema = new Schema<ILead>({
      name : {
            type : String ,
            required : [true , "Lead name is required"]
      },
      email :{
            type : String,
            required : [true , "Lead email is required"]
      },
      status : {
            type : String , 
            enum : ["new" , "contacted" , "qualified" , "lost"],
            default : "new"
      },
      source: {
      type: String,
      enum: ["website", "instagram", "referral" ,"other"],
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,

    },
},{timestamps:true})

const Lead = mongoose.model<ILead>("lead", leadSchema);

export default Lead;