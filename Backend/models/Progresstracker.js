import mongoose from "mongoose"

const ProgressTrackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam", required: true
  },
  completedTopics: [{ type: String }],
  score: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }}, {timestamps: true });
export default mongoose.model("ProgressTracker", ProgressTrackerSchema);
