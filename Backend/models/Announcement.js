import mongoose from "mongoose"

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
/*    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    }*/ },{timestamps: true });

export default mongoose.model("Announcement", AnnouncementSchema);
