import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({

    jobSeekerInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },  
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
           validate: [validator.isEmail, 'Please provide a valid email']
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        skills: {
            type: [String],
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        education: {
            type: String,
            required: true
        },
        resume: {
           public_id: {
           type:String,
        },
        url: {
            type: String,
        },
    },
    coverLetter: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:["jobSeeker"],
        required: true
    },
}, 

    employeerInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
      role: {
        type: String,
        enum:["Employeer"],
        required: true
      },
    },
      jobInfo:{
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        jobTitle: {
            type: String,
            required: true
        },
      },
      deletedBy:{
        jobSeeker:{
            type: Boolean,
            default: false
        },
        Employeer:{
            type: Boolean,
            default: false
        },
      },
      status: {
        type: String,
        enum:["Pending", "Accepted", "Rejected"],
        default: "Pending"
      },
    } , 
{timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;