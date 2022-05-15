import React, { useState } from "react";
import "../style/user.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { emitter } from "../service/event-emitter";
import { getUsers } from "../datastore/userListDataStore";
import { getId } from "../datastore/userDataStore";

export default function UserList() {
  const [show, setModalShow] = useState(false);
  const [users, setUsers] = useState(getUsers);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const reload = () => emitter.emit('get-users', getId());

  emitter.on('update-users', users => {
    setUsers(users);
  })

  return (
    <div className="user-list">
      <div className="container">
        <div className="card">
          <div className="card-title">
            <p>連絡先　一覧</p>
          </div>
          <div className="card-body">
            {users.map((value, index) => (
              <button className="user-name" key={index}>
                <p>{value.name}</p>
              </button>
            ))}
          </div>
          <div className="d-flex gap-2 mb-2">
            <Button
              className="btn-add-address"
              variant="primary"
              onClick={handleShow}
            >
              連絡先　追加
            </Button>
            <Button className="btn-update-users" onClick={reload}>リスト更新</Button>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>連絡先　追加</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>ユーザー検索</Form.Label>
              <Form className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>氏名</Form.Label>
                  <Form.Control type="text" placeholder="例: 徳島　太郎" />
                  <Form.Label>メールアドレス</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="例: example@gmail.com"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                キャンセル
              </Button>
              <Button variant="primary" onClick={handleClose} disabled>
                追加
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
