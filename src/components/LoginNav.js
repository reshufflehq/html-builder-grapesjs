import '@reshuffle/code-transform/macro';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import { useAuth } from '@reshuffle/react-auth';

export default function LoginNav({ handleSave }) {
  const { authenticated, profile, getLoginURL, getLogoutURL } = useAuth();

  return (
    <>
      <nav className='navbar navbar-expand-lg  navbar-dark bg-dark'>
        <a className='navbar-brand' href='/'>
          HTML Builder Demo
        </a>

        {authenticated && handleSave && (
          <Button className='navbar-brand' onClick={() => handleSave()}>
            Save
          </Button>
        )}
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav mr-auto' />
          {authenticated ? (
            <Dropdown alignRight>
              <Dropdown.Toggle id='dropdown-basic'>
                {profile.displayName}
              </Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu-align-right'>
                <Link to='/dashboard' className='menu-item dropdown-item'>
                  Admin Panel
                </Link>
                <Dropdown.Item href={getLogoutURL()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <span className='navbar-text'>
              <a
                className='btn btn-inline-primary'
                role='button'
                href={getLoginURL()}
              >
                Login
              </a>
            </span>
          )}
        </div>
      </nav>
    </>
  );
}
