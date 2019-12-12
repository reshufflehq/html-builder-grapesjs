import '@reshuffle/code-transform/macro';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAuth } from '@reshuffle/react-auth';
import LoginNav from '../LoginNav';

import './AdminPanel.css';

export default function AdminPanel() {
  const { profile } = useAuth();

  return (
    <>
      <LoginNav />

      <Jumbotron className='highLevel d-flex justify-content-center align-items-center'>
        <Jumbotron className=''>
          <h2>{`Welcome, ${profile.displayName}`}</h2>
          <h5 className=''>{`Please choose between the options below:`}</h5>
          <Row>
            <Col className='action-col'>
              <Link
                className='action-btn btn btn-outline-secondary'
                to='/editor'
              >
                Edit Web site
              </Link>
            </Col>
            <Col className='action-col'>
              <Link
                className='action-btn btn btn-outline-secondary'
                to='/subscription'
              >
                Users subscription list
              </Link>
            </Col>
            <Col className='action-col'>
              <Link
                className='action-btn btn btn-outline-secondary'
                to='/dev/db-admin'
              >
                Web site Database
              </Link>
            </Col>
          </Row>
        </Jumbotron>
      </Jumbotron>
    </>
  );
}
