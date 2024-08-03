import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
   
    logo: {
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    },
    name: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
    },
    website: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    companySize: {
        type: String,
    },
    founded: {
        type: String,
    },
    headQuarter: {
        type: String,
    },
    partners: {
        type: String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true});

const Company = mongoose.model("Company", companySchema);

export default Company;