import React from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
function MessageForm(props) {
  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
      </Form>

      <ProgressBar variant="warning" label="60%" now={45} />

      <Row>
        <Col>
          <button
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
