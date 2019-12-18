import '@reshuffle/code-transform/macro';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '@reshuffle/react-auth';
import ImportModal from './ImportModal';

export default function AdminPanel({ history }) {
  const { profile } = useAuth();
  const [modalShow, setModalShow] = useState(false);
  const [showMessageOnSave, setShowMessageOnSave] = useState(false);

  const handleOnSaveMessage = () => {
    setModalShow(false);
    setShowMessageOnSave(true);
    setTimeout(() => setShowMessageOnSave(false), 5000);
  };

  const actionColumnStyle = {
    paddingTop: '2rem',
  };

  const actionButtonStyle = {
    height: '150px',
    width: '150px',
  };

  return (
    <>
      {showMessageOnSave && (
        <Alert variant='success'>Your Changes was saved!</Alert>
      )}
      <Jumbotron className='highLevel d-flex justify-content-center align-items-center'>
        <Jumbotron className=''>
          <h2>{`Welcome, ${profile.displayName}`}</h2>
          <h5 className=''>{`Please choose between the options below:`}</h5>
          <Row>
            <Col style={actionColumnStyle}>
              <button
                style={actionButtonStyle}
                className='btn btn-outline-secondary'
                onClick={() => history.replace('/editor')}
              >
                Edit Web site
              </button>
            </Col>
            <Col style={actionColumnStyle}>
              <button
                style={actionButtonStyle}
                className='btn btn-outline-secondary'
                onClick={() => setModalShow(true)}
              >
                Import CSS/HTML/JS
              </button>
              <ImportModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSaveDone={() => handleOnSaveMessage()}
              />
            </Col>
          </Row>
        </Jumbotron>
      </Jumbotron>
    </>
  );
}
