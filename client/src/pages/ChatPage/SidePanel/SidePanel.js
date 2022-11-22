import React from "react";
import UserPanel from "./UserPanel";
import Favorited from "./Favorited";
import ChatRoom from "./ChatRoom";
import DirectMessages from "./DirectMessages";

function SidePanel(props) {
  return (
    <div
      style={{
        background: "#f44336",
        padding: "2rem",
        minHeight: "100vh",
        color: "white",
        minWidth: "275px",
      }}
    >
      <UserPanel />
      <Favorited />
      <ChatRoom />
      <DirectMessages />
    </div>
  );
}

export default SidePanel;
