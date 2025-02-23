import mongoose from "mongoose";

const forumThreadSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
        }
    ],
    likes: [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
        type: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("ForumThread", forumThreadSchema);
