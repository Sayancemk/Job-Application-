import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum:["Full-Time","Part-Time","Contract","Internship","Temporary"]
    },
    experience: {
        type: String,
        required: true,
        enum:["Entry Level","Mid Level","Senior Level"]
    },
    qualification: {
        type: String,
        required: true
    },
    responsibilities: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jobNiches: {
        type: String,
        required: true
    },
    newsLetterSent:{
        type: Boolean,
        default: false
    },
    hiringMultipleCandidate:{
        type: Boolean,
        enum: [true, false],
        default: false
    },
    jobStatus:{
        type: String,
        required: true,
        default:["Active","Inactive"]
    },
    offers:{
        type:String,
    },
},{timestamps:true});


const Job = mongoose.model("Job", jobSchema);

export default Job;