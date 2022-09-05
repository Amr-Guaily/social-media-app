import { orderBy, query } from 'firebase/firestore';
import { pinCollectionRef } from '../lib/firebase';
import { PinsGrid } from '../components/index';

const Home = () => {
  const q = query(pinCollectionRef, orderBy('createdAt', 'desc'));

  return <PinsGrid q={q} />;
};

export default Home;
