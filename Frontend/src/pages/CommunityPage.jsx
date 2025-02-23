import React, { useState, useEffect } from "react";
import "./CommunityPage.css";
import axios from "axios";

const CommunityPage = () => {
  const [chatText, setChatText] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [newDoubt, setNewDoubt] = useState("");
  const [selectedTab, setSelectedTab] = useState("forum");
  const [forumThreads, setForumThreads] = useState([]);

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
      </div>

      {/* Main Content */}
      <div className="main-content">
        {selectedTab === "forum" && (
          <div className="forum-section">Doubts Section</div>
        )}
        {selectedTab === "announcement" && (
          <div className="announcement-section">Announcements</div>
        )}
        {selectedTab === "community" && (
          <div className="community-chat-section">
            <div className="chat">
              {chatText.map((chat, index) => (
                <div key={index} className="message">
                  <h4>{chat.author}:</h4>
                  <p>{chat.msg}</p>
                  <span>{chat.likes}</span>
                  <div className="comments">
                    {chat.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <span>{comment.user}:</span>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                  </div>
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
                  <h3>{thread.title}</h3>
                  <p>{thread.content}</p>
                  <div className="comments">
                    {thread.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <span>{comment.user}:</span>
                        <p>{comment.text}</p>
                      </div>
                    ))}
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
            <input type="text" placeholder="Ask a doubt..." value={newDoubt} onChange={newD}/>
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
