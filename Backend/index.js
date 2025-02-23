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
import forumThreadRoutes from "./routes/ForumThreadRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import communityChatRoute from "./routes/communityChatRoute.js";
import communityChat from "./models/communityChat.js";
// import Server from "socket.io";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:"secretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 60*60*1000,
    maxAge: 60*60*1000,
    httpOnly: true,
  }
}));

// const server=http.createServer(app);
// const io = new Server(server);
// io.on("connection", (socket) => {

// })

connect('mongodb+srv://Userdb:whyshouldisay1@cluster0.uuehk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const PORT = process.env.PORT || 3000;

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
app.use("/api/forum", forumThreadRoutes);
app.use("/api/communityChat", communityChatRoute);
app.get("/", (req, res) => {
  res.send("Welcome to the Exam Preparation!");
});