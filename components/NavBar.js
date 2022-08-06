/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { BsFillChatDotsFill, BsBellFill, BsPersonCircle } from 'react-icons/bs';
// import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img className="navLogo" src="/navLogo.png" alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link passHref href="/">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link passHref href="/today">
                  <a className="nav-link" href="#">Today</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link passHref href="/create">
                  <a className="nav-link" href="#">Create</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link passHref href="/home">
                  <a className="nav-link" href="#">Home2.0</a>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link passHref href="/create">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Create
                  </a>
                </Link>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex search-me" role="search">
              <input className="form-control me-2" type="search" placeholder="&#128269; Search" aria-label="Search" />
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </form>
            <button type="button" className="icons btn btn-light" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover">
              <h3><BsBellFill /></h3>
            </button>
            <button type="button" className="icons btn btn-light" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover">
              <h3><BsFillChatDotsFill /></h3>
            </button>
            <Link passHref href="/profile/new">
              <h3><BsPersonCircle /></h3>
            </Link>
            {/* <button type="button" className="btn btn-outline-danger" onClick={signOut}>Log Out</button> */}
          </div>
        </div>
      </nav>
    </>
  );
}
