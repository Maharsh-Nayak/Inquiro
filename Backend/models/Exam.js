import mongoose from "mongoose"

const ExamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: { type: String },
    subjects: [{ type: String }],
    communities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }],
    announcements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement"
    }]},{ timestamps: true });

export default mongoose.model("Exam", ExamSchema);
