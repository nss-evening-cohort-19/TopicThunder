import { useRouter } from 'next/router';
import SavePinForm from '../../../components/forms/PinForm';

export default function SavePin() {
  const router = useRouter();

  const { firebaseKey } = router.query;

  return (<SavePinForm pinFirebaseKey={firebaseKey} />);
}
