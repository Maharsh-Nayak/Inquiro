import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";
import userRoutes from './routes/UserRoutes.js';
import examRoutes from './routes/ExamRoutes.js';
import messageRoutes from './routes/MessageRoutes.js';
import announcementRoutes from './routes/AnnouncementRoutes.js';
import channelRoutes from './routes/ChannelRoutes.js';
import communityRoutes from './routes/CommunityRoutes.js';
import progressTrackerRoutes from './routes/ProgressTrackerRoutes.js';
import chatbotRoutes from './routes/ChatbotRoutes.js';
import cors from "cors";

const app = express();

app.use(cors(
    {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
));
app.use(express.json());


connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/progress", progressTrackerRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Exam Preparation!");
});