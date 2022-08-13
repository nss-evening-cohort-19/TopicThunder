/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { removePinFromBoard } from '../api/collectionsData';
// import { useRouter } from 'next/router';
// import { deletePin } from '../api/mergedData';
// import { renderAbsoluteTime, renderRelativeTime } from '../utils/time';

function PinCardForGrid({
  pinObj, remPin, onUpdate, boardKey,
}) {
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
        <div className="hoverContainer">
          { remPin
            ? (
              <button
                type="button"
                className="btn btn-light"
                style={{
                  backgroundColor: 'black', color: 'hotpink', width: '40px', height: '40px', display: 'flex',
                }}
                onClick={() => removePinFromBoard(pinObj.firebaseKey, boardKey).then(onUpdate)}
              >X
              </button>
            )
            : ''}
          <Link passHref href={`pin/${pinObj.firebaseKey}`}>
            <p className="hoverTitle">{pinObj.name}</p>
          </Link>
          <p className="hoverDescription">{pinObj.description}</p>

        </div>

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
  remPin: PropTypes.bool,
  onUpdate: PropTypes.func,
  boardKey: PropTypes.string,
};

PinCardForGrid.defaultProps = {
  pinObj: PropTypes.shape({
    name: 'Some crap',
    image: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
    link: 'Someaddress@blabla.com',
    firebaseKey: '123',
  }),
  remPin: false,
  onUpdate: () => console.warn('default'),
  boardKey: '',
};

export default PinCardForGrid;
