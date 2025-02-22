import mongoose from "mongoose"

const ChannelSchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Community",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }]},{timestamps: true });

export default mongoose.model("Channel", ChannelSchema);
