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
  const [percentage, setPercentage] = useState(0);
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

  const handleUploadImage = (event) => {
    const file = event.target.files[0];

    const filePath = `message/public/${file.name}`;
    const metadata = { contentType: file.type };
    setLoading(true);
    try {
      // 스토리지에 파일 저장
      let uploadTask = storageRef.child(filePath).put(file, metadata);

      // 파일 저장되는 퍼센티지 구하기
      uploadTask.on(
        "state_changed",
        (UploadTaskSnapshot) => {
          const percentage = Math.round(
            (UploadTaskSnapshot.bytesTransferred /
              UploadTaskSnapshot.totalBytes) *
              100
          );
          console.log("percentage", percentage);
          setPercentage(percentage);
        },
        (err) => {
          console.error.apply(err);
          setLoading(false);
        },
        () => {
          // 저장이 다 된 후에 파일 메시지 전송 (디비 저장)
          // 저장된 파일을 다운로드 받을 수 있는 유알엘 가져오기
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("downloadURL", downloadURL);
            set(
              push(child(messagesRef, chatRoom.id)),
              createMessage(downloadURL)
            );
            setLoading(false);
          });
        }
      );
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

      {!(percentage === 0 || percentage === 100) && (
        <ProgressBar
          variant="warning"
          label={`${percentage}%`}
          now={percentage}
        />
      )}

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
            disabled={loading ? true : false}
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
            disabled={loading ? true : false}
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
