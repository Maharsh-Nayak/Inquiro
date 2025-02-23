import mongoose from "mongoose";

const forumThreadSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    comments: [
        {
            text: {
                type: String,
                required: true
            }
        }
    ],
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("ForumThread", forumThreadSchema);
