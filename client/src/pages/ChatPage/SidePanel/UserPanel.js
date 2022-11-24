import React from "react";
import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { authService, storageService } from "../../../firebase";
import { useRef } from "react";

function UserPanel(props) {
  const user = useSelector((state) => state.user.currentUser);
  const inputOpenImageRef = useRef();
  const handleLogout = () => {
    authService.signOut();
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const metadata = { contentType: file.type };
    try {
      // 스토리지에 파일 저장
      let uploadTaskSnapshot = await storageService
        .ref()
        .child(`user_image/${user.uid}`)
        .put(file, metadata);
      console.log(uploadTaskSnapshot);
    } catch (error) {
      // alert(error);
    }
  };

  return (
    <div>
      <h3 style={{ color: "white" }}>
        <IoIosChatboxes />
        {""} Chat App
      </h3>

      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          src={user && user.photoURL}
          style={{ width: "30px", height: "30px", marginTop: "3px" }}
          roundedCircle
        />

        <input
          type={"file"}
          onChange={handleUploadImage}
          style={{ display: "none" }}
          accept="image/jpeg, image/png"
          ref={inputOpenImageRef}
        />

        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "transparent", boder: "0px" }}
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserPanel;
