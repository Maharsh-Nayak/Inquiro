import React, { useState, useEffect, use } from "react";
import "./CommunityPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CommunityPage = () => {
  const [chatText, setChatText] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [newDoubt, setNewDoubt] = useState("");
  const [selectedTab, setSelectedTab] = useState("forum");
  const [forumThreads, setForumThreads] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const [activeThreadId, setActiveThreadId] = useState(null);
  const navigate = useNavigate();

const handleLogout = () => {
  navigate("/"); // Redirect to home page
};


  // Update the click handler
  const toggleTextBox = (threadId) => {
    setActiveThreadId(prevId => (prevId === threadId ? null : threadId));
  };

  // Add new comment
  async function handleAddComment(e) {
    e.preventDefault();
    if (newComment.trim() === "") return; // Avoid sending empty comments

    try {
      let res = await axios.post(
        `/api/forum/${activeThreadId}/comments`,
        { newComment }, // Send as object
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true // Include cookies
        }
      );
      console.log("Response:", res.status);
      console.log("Response Data:", res.data);
    } catch (error) {
      console.log("Error:", error);
    }

    console.log("Adding comment:", newComment);

    setForumThreads((prevThreads) => {
      return prevThreads.map((thread) => {
        if (thread._id === activeThreadId) {
          return {
            ...thread,
            comments: [...thread.comments, { text: newComment }]
          };
        }
        return thread;
      });
    });
    setNewComment("");
    setActiveThreadId(null);
  }

  // Fetch Chats when "Community" tab is selected
  useEffect(() => {
    if (selectedTab === "community") {
      axios
        .get("/api/communityChat/")
        .then((res) => {
          console.log("Chats:", res.data);
          setChatText(res.data);
        })
        .catch((error) => {
          console.error("Error fetching chats:", error);
        });
    }
    else if (selectedTab === "forum") {
      axios
        .get("/api/forum/")
        .then((res) => {
          console.log("Chats:", res.data);
          setForumThreads(res.data);
        })
        .catch((error) => {
          console.error("Error fetching chats:", error);
        });

      axios.get("/api/forum/comments").then((res) => {
        console.log("Comments:", res.data);
        setComments(res.data);
      });
    }
  }, [selectedTab]); // Fetch only when selectedTab changes to 'community'

  // Send New Message
  async function sendText(e) {
    e.preventDefault();
    if (newMsg.trim() === "") return; // Avoid sending empty messages

    try {
      let res = await axios.post(
        '/api/communityChat/',
        { newMsg }, // Send as object
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true // Include cookies
        }
      );
      console.log("Response:", res.status);
      console.log("Response Data:", res.data);

      // Clear input and refresh chat list
      setNewMsg("");
      setChatText((prevChats) => [...prevChats, newMsg]);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  // Send New Doubt
  async function sendD(e) {
    console.log("Sending doubt");
    e.preventDefault();
    if (newDoubt.trim() === "") return; // Avoid sending empty messages
    console.log("Doubt:", newDoubt);
    try {
      let res = await axios.post(
        '/api/forum/',
        { newDoubt }, // Send as object
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true // Include cookies
        }
      );
      console.log("Response:", res.status);
      console.log("Response Data:", res.data);

      // Clear input and refresh chat list
      setNewDoubt("");
      setChatText((prevChats) => [...prevChats, newDoubt]);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  // Handle input change
  function newMs(e) {
    setNewMsg(e.target.value);
  }

  function newD(e) {
    setNewDoubt(e.target.value);
  }

  const handleLike = async (threadId) => {
    try {
      let res = await axios.post(
        `/api/forum/${threadId}/like`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log("Like Response:", res.data);
  
      // Update the like count in state
      setForumThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread._id === threadId
            ? { ...thread, likes: res.data.likes }
            : thread
        )
      );
    } catch (error) {
      console.error("Error liking thread:", error);
    }
  };

  return (
    <div className="community-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          onClick={() => setSelectedTab("forum")}
          className={selectedTab === "forum" ? "active" : ""}
        >
          Forum
        </button>
        <button
          onClick={() => setSelectedTab("announcement")}
          className={selectedTab === "announcement" ? "active" : ""}
        >
          Announcement
        </button>
        <button
          onClick={() => setSelectedTab("community")}
          className={selectedTab === "community" ? "active" : ""}
        >
          Community
        </button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {selectedTab === "forum" && (
          <div className="forum-section">Doubts Section</div>
        )}
        {selectedTab === "announcement" && (
          <div className="announcement-section">Announcements:<h>GATE-2025 exam centres changed to Lucknow for candidates who were earlier allotted Prayagraj for 15th and 16th February 2025 amid Mahakumbh. The candidates are advised to download the freshly released admit cards from the GOAPS portal (https://goaps.iitr.ac.in/login)</h>
          <h>GATE-2025 exam centres changed to Lucknow for candidates who were earlier allotted Prayagraj for 1st and 2nd February 2025 amid Mahakumbh. The candidates are advised to download the freshly released admit cards from the GOAPS portal (https://goaps.iitr.ac.in/login)
            </h>
            <h>GATE 2025 Admit Cards are now available to download from the GOAPS portal https://goaps.iitr.ac.in/login. Best of luck for GATE 2025.</h>
            <h>Download of GATE 2025 Admit Card will be available from 2nd January 2025 7th January 2025.</h>
            <h>Candidates Data Change option is closed now and Defect Rectification will be closed soon, please do the rectification whoever not attended.</h></div>
        )}
        {selectedTab === "community" && (
          <div className="community-chat-section">
            <div className="chat">
              {chatText.map((chat, index) => (
                <div key={index} className="message">
                  <h4>{chat.name}:</h4>
                  <p>{chat.msg}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedTab === "forum" && (
          <div className="forum-section">
            <div className="forum-threads">
              {forumThreads.map((thread, index) => (
                <div key={index} className="thread">
                  <p>{thread.content}</p>
                  <span>{thread.likes}</span>
                  <div className="comments">
                    {thread.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <p>{comment.text}</p>
                      </div>
                    ))}
                    <button onClick={() => toggleTextBox(thread._id)}>
                      Add new Comment
                    </button>
                    {activeThreadId === thread._id && (
                      <form onSubmit={handleAddComment} className="add-comment-form">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Type your comment..."
                          required
                        />
                        <button type="submit">Submit</button>
                      </form>
                    )}
                    <button onClick={() => handleLike(thread._id)}>
                      👍 {thread.likes} Likes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Input Section */}
      <div className="bottom-input">
        {selectedTab === "forum" && (
          <div className="doubt-input-container">
            <input type="text" placeholder="Ask a doubt..." value={newDoubt} onChange={newD} />
            <button onClick={sendD}>Post</button>
          </div>
        )}
        {selectedTab === "community" && (
          <div className="message-input-container">
            <input
              type="text"
              placeholder="Write a message..."
              value={newMsg}
              onChange={newMs}
            />
            <button onClick={sendText}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
