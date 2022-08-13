import PropTypes from 'prop-types';
import Link from 'next/link';

export default function NotificationCard({
  handle, name, image, verb, seen, link,
}) {
  return (
    <>
      <div className="friendCard">
        <Link passHref href={`../profile/${handle}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} className="friendImg" alt="..." />
        </Link>
        <div className="friendDetails">
          <h5>{name}</h5>
        </div>
        <Link passHref href={link}>
          {seen ? <p>{verb}</p> : <h5>{verb}</h5>}
        </Link>
      </div>
    </>
  );
}

NotificationCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  handle: PropTypes.string,
  verb: PropTypes.string,
  link: PropTypes.string,
  seen: PropTypes.bool,
};

NotificationCard.defaultProps = {
  name: '',
  image: '',
  handle: '',
  verb: '',
  link: '',
  seen: true,
};
