import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { emitter } from "../../../service/event-emitter";
import { getUsers } from "../../../datastore/userListDataStore";

function CreateTalkroomModal() {
  const [isShow, setShow] = useState(false);
  const [users, setUsers] = useState(getUsers);
  // event handler
  emitter.on("talk-page-left.show-create-talk-modal", () => {
    setShow(true);
    const users = getUsers();
    setUsers(users);
  });

  // methods
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Modal className="create-talk-modal" show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>トーク作成</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="set-talk-name">
          <p>トーク名</p>
          <input type="text" placeholder="トーク名"></input>
        </div>
        <div className="choice-user">
          <p>トークを開始する連絡先を選択してください</p>
        </div>
        <div className="d-grid gap-2">
          {users.map((value, index) => (
            <Button key={index}>
              {value.name}
            </Button>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button disabled>トーク作成</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTalkroomModal;
