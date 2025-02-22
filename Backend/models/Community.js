import mongoose from "mongoose"

const CommunitySchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam", required: true
  },
  name: {
    type: String,
    required: true
  },
  channels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel"
  }]},{ timestamps: true });

export default mongoose.model("Community", CommunitySchema);
