import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getDatabase, ref, set, remove, push, child } from "firebase/database";
import { storageService } from "../../../firebase";
// import {
//   getStorage,
//   ref as strRef,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
import { useSelector } from "react-redux";

function MessageForm(props) {
  const user = useSelector((state) => state.user.currentUser);
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  //   console.log("chatRoom", chatRoom);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesRef = ref(getDatabase(), "messages");
  const inputOpenImageRef = useRef();
  // const storageRef = ref(getStorage());
  const storageRef = storageService.ref();

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

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];

    const filePath = `message/public/${file.name}`;
    const metadata = { contentType: file.type };

    try {
      await storageRef.child(filePath).put(file, metadata);
    } catch (err) {
      alert(err);
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
            onClick={handleOpenImageRef}
            className="message-form-button"
            style={{
              width: "100%",
            }}
          >
            Upload
          </button>
        </Col>
      </Row>

      <input
        accept="image/jpeg, image/png"
        style={{ display: "none" }}
        type="file"
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
      />
    </div>
  );
}

export default MessageForm;
