/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import { Button } from 'bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="signOutPage">
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '90vw',
          margin: '0 auto',
        }}
      >
        <img src="/logoType.png" alt="Topic Thunder" />
      </div>
      <div className="signInBtn">
        <button type="button" size="lg" className="btn signBtn btn-primary btn-large" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Signin;
