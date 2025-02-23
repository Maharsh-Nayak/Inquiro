import mongoose from "mongoose"

const CommunityChatSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  msg: {
    type: String,
    required: true
  },
//   channels: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Channel"
//   }
},{ timestamps: true });

export default mongoose.model("CommunityChat", CommunityChatSchema);
