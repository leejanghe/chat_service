import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaLock } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "react-bootstrap/esm/Image";
function MessageHeader({ handleSearchChange }) {
  return (
    <div
      style={{
        width: "100%",
        height: "170px",
        border: ".2rem solid #ececec",
        borderRadius: "4px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Container>
        <Row>
          <Col>
            <h2>
              <FaLock />
              ChatRoomName <MdFavorite />
            </h2>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <AiOutlineSearch />
              </InputGroup.Text>
              <FormControl
                onChange={handleSearchChange}
                placeholder="Search Messages"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p>
            <Image style={{ width: "30px", height: "30px" }} /> user name
          </p>
        </div>

        <Row>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>chat room</Card.Body>
                </Accordion.Collapse>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>chat room</Card.Body>
                </Accordion.Collapse>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MessageHeader;
