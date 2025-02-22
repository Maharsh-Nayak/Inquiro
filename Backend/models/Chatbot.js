import mongoose from "mongoose"

const ChatbotQuerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }},{ timestamps: true});

export default mongoose.model("Chatbot", ChatbotQuerySchema);
