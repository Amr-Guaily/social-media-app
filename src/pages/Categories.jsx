import { query, where } from 'firebase/firestore';
import { pinCollectionRef } from '../lib/firebase';
import { useParams } from 'react-router-dom';
import { PinsGrid } from '../components/index';

const Categories = () => {
  const { categoryName } = useParams();
  const q = query(
    pinCollectionRef,
    where('formData.category', '==', `${categoryName}`)
  );

  return <PinsGrid q={q} categoryName={categoryName} />;
};

export default Categories;
