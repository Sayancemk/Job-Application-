import mongoose from "mongoose";

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




});