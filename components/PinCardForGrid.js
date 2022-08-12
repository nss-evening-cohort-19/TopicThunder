/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { deletePin } from '../api/mergedData';
// import { renderAbsoluteTime, renderRelativeTime } from '../utils/time';

function PinCardForGrid({ pinObj }) {
  // const router = useRouter();
  // const deleteThisPin = () => {
  //   if (window.confirm(`Delete ${pinObj.name}?`)) {
  //     deletePin(pinObj.firebaseKey).then(() => router.push('/home'));
  //   }
  // };

  return (
    <>
      <div className="card gridCard">
        <img src={pinObj.image} className="card-img-top" alt="pin-pic" />
        <Link passHref href={`../pin/${pinObj.firebaseKey}`}>
          <div className="hoverContainer">
            <p className="hoverTitle">{pinObj.name}</p>
            <p className="hoverDescription">{pinObj.description}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

PinCardForGrid.propTypes = {
  pinObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    user: PropTypes.string,
    time: PropTypes.number,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PinCardForGrid.defaultProps = {
  pinObj: PropTypes.shape({
    name: 'Some crap',
    image: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
    link: 'Someaddress@blabla.com',
    firebaseKey: '123',
  }),
};

export default PinCardForGrid;
