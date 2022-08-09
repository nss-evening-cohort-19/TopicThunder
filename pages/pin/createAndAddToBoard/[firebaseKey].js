import { useRouter } from 'next/router';
import PinForm from '../../../components/forms/PinForm';

export default function EditPin() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return (<PinForm board={firebaseKey} />);
}
