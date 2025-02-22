import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel", required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }},{ timestamps: true });
export default mongoose.model("Message", MessageSchema);
