import React, { Component } from "react";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

class MainPanel extends Component {
  render() {
    return (
      <div
        style={{
          padding: "2rem 2rem 0 2rem",
        }}
      >
        <MessageHeader />
        <div
          style={{
            width: "100%",
            height: "500px",
            border: "1px solid black",
            overflowY: "auto",
          }}
        >
          <Message />
        </div>
        <MessageForm />
      </div>
    );
  }
}

export default MainPanel;
