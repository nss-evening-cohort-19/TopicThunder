/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  BsFillChatDotsFill, BsBellFill, BsPersonCircle,
} from 'react-icons/bs';
import { useAuth } from '../utils/context/authContext';
import { getUserByUid } from '../api/usersData';

export default function NavBar() {
  const { user } = useAuth();
  const router = useRouter();

  const checkIfUserExistsThenRoute = () => {
    getUserByUid(user.uid).then((response) => {
      if (response) {
        router.push(`/profile/${response.handle}`);
      } else {
        router.push('/profile/new');
      }
    });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link passHref href="/">
            <a className="navbar-brand" href="#">
              <img className="navLogo" src="/navLogo.png" alt="" />
            </a>
          </Link>
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
              {user.handle !== null
                ? (
                  <li className="nav-item">
                    <Link passHref href="/pin/new">
                      <a className="nav-link" href="#">Create</a>
                    </Link>
                  </li>
                )
                : ''}
            </ul>
            <form className="d-flex search-me" role="search">
              <input className="form-control me-2" type="search" placeholder="&#128269; Search" aria-label="Search" />
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </form>
            {user.handle !== null
              ? (
                <>
                  <button type="button" className="icons btn btn-light">
                    <span className="position-absolute bottom-4 start-85 translate-middle p-2 bg-danger border border-light rounded-circle notificationDot">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                    <h3><BsBellFill /></h3>
                  </button>
                  <button type="button" className="icons btn btn-light">
                    <h3><BsFillChatDotsFill /></h3>
                  </button>
                </>
              )
              : ''}
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" onClick={() => checkIfUserExistsThenRoute()} className="icons btn btn-light">
                <h3><BsPersonCircle /></h3>
              </button>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}
