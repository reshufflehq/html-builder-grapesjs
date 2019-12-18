import '@reshuffle/code-transform/macro';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ImportForm from './ImportForm';

export default function ImportModal({ show, onHide, onSaveDone }) {
  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title>Import</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImportForm onSaveDone={onSaveDone} />
      </Modal.Body>
    </Modal>
  );
}
