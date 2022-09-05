import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Comments, Loading, SaveBtn, UserImg } from '../components';
import { pinCollectionRef } from '../lib/firebase';

const PinDetails = () => {
  const [pinData, setPinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pinId } = useParams();

  const { url, formData, postedby } = pinData;

  const docRef = doc(pinCollectionRef, `${pinId}`);

  useEffect(() => {
    const unsub = getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        setLoading(false);
        setPinData(snapshot.data());
      } else {
        console.log('No such a document');
      }
    });

    return () => unsub;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-2 laptop:flex-row bg-white rounded-xl overflow-hidden">
      <div className="laptop:w-[50%] laptop:max-w-[500px] laptop:max-h-[550px]">
        <img
          src={url}
          alt={formData.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 py-5 px-5">
        <div className="">
          <SaveBtn saves={pinData.saves} pinId={pinId} />
        </div>
        <h3 className="font-semibold text-2xl">{formData.title}</h3>
        <p className="my-3">{formData.about}</p>

        <div className="flex items-center gap-2">
          <UserImg
            photoUrl={postedby.photoUrl}
            alt={postedby.name.slice(0, 1)}
          />
          <h3 className="font-semibold text-lg">{postedby.name}</h3>
        </div>

        <Comments pinId={pinId} />
      </div>
    </div>
  );
};

export default PinDetails;
