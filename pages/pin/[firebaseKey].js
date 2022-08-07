import React from 'react';
// import { useRouter } from 'next/router';
import PinCard from '../../components/PinCard';

function ViewPinCard() {
  // const [pinDetails, setPinDetails] = useState({});
  // const router = useRouter();
  // const deleteIndPin = (pinObjects, onUpdate) => {
  //   if (window.confirm(`Delete ${pinObjects.name}?`)) {
  //     deletePin(pinObjects.firebaseKey).then(() => onUpdate());
  //   }
  // };

  // const { firebaseKey } = router.query;

  // useEffect(() => {
  //   viewPinDetails(firebaseKey).then(setPinDetails);
  // }, [firebaseKey]);

  return (
    <>
      <div>Individual Pin Card</div>
      <PinCard />
    </>
  );
}

export default ViewPinCard;
