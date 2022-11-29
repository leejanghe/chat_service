import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getDatabase, ref, set, remove, push, child } from "firebase/database";
import { useSelector } from "react-redux";
function MessageForm(props) {
  const user = useSelector((state) => state.user.currentUser);
  const chatRoom = useSelector((state) => state.ChatRoom.currentChatRoom);
  //   console.log("chatRoom", chatRoom);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesRef = ref(getDatabase(), "messages");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: new Date(),
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };

    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = content;
    }

    return message;
  };

  const handleSubmit = async () => {
    if (!content) {
      setErrors((prev) => prev.concat("Type contents first"));
      return;
    }
    setLoading(true);
    //firebase에 메시지를 저장하는 부분
    try {
      //   await messagesRef.child(chatRoom.id).push().set(createMessage());
      await set(push(child(messagesRef, chatRoom.id)), createMessage());

      // typingRef.child(chatRoom.id).child(user.uid).remove();
      // await remove(child(typingRef, `${chatRoom.id}/${user.uid}`));
      setLoading(false);
      setContent("");
      setErrors([]);
    } catch (error) {
      setErrors((pre) => pre.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control
            value={content}
            onChange={handleChange}
            as="textarea"
            rows="3"
          />
        </Form.Group>
      </Form>

      <ProgressBar variant="warning" label="60%" now={45} />
      <div>
        {errors.map((errorMsg) => (
          <p style={{ color: "red" }} key={errorMsg}>
            {errorMsg}
          </p>
        ))}
      </div>
      <Row>
        <Col>
          <button
            onClick={handleSubmit}
            className="message-form-button"
            style={{
              width: "100%",
            }}
          >
            Send
          </button>
        </Col>
        <Col>
          <button
            className="message-form-button"
            style={{
              width: "100%",
            }}
          >
            Upload
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default MessageForm;
