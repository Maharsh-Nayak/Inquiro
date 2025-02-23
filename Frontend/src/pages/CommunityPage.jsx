import React, { useState } from "react";
import "./CommunityPage.css";

const CommunityPage = () => {
  const [selectedTab, setSelectedTab] = useState("forum");
  const [doubtText, setDoubtText] = useState("");
  const [chatText, setChatText] = useState("");

  return (
    <div className="community-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setSelectedTab("forum")} className={selectedTab === "forum" ? "active" : ""}>Forum</button>
        <button onClick={() => setSelectedTab("announcement")} className={selectedTab === "announcement" ? "active" : ""}>Announcement</button>
        <button onClick={() => setSelectedTab("community")} className={selectedTab === "community" ? "active" : ""}>Community</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {selectedTab === "forum" && <div className="forum-section">Doubts Section</div>}
        {selectedTab === "announcement" && <div className="announcement-section">Announcements</div>}
        {selectedTab === "community" && <div className="community-chat-section">Community Chat</div>}
      </div>

      {/* Bottom Input Section */}
      <div className="bottom-input">
        {selectedTab === "forum" && (
          <div className="doubt-input-container">
          <input type="text" placeholder="Ask a doubt..." />
          <button>Post</button>
        </div>
        
        )}
        {selectedTab === "community" && (
          <div className="message-input-container">
          <input type="text" placeholder="Write a message..." />
          <button>Send</button>
        </div>
        
        
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
