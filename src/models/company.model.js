import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
   
    logo: {
        type: String,
        required: true
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
        required: true
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
        required: true,
       
    },
    partners: {
        type: String,
    },
    niches: {
        type: String,
        required: true
    },

});

const Company = mongoose.model("Company", companySchema);
export default Company;