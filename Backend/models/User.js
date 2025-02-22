import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    examEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam"
    }],
    progress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProgressTracker"
    }],
    /* role: {
        type: String, 
        enum: ["admin", "user"],
        default: "user"
    } */
}, {timestamps: true}
)

export default mongoose.model("User", userSchema);
