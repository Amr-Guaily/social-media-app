import { doc, getDoc, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading, PinsGrid, UserImg } from '../components';
import { pinCollectionRef, userscolectionRef } from '../lib/firebase';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('saved');
  const { userId } = useParams();
  const [q, setQ] = useState(
    query(pinCollectionRef, where('saves', 'array-contains', `${userId}`))
  );
  const { photoURL, name } = userData;

  // Fetch user
  useEffect(() => {
    const docRef = doc(userscolectionRef, `${userId}`);
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.data());
        setLoading(false);
      }
    });
  }, []);

  function toggleHandler(e) {
    const { id } = e.target;
    if (id === 'saved-pins') {
      setActive('saved');
      setQ(
        query(pinCollectionRef, where('saves', 'array-contains', `${userId}`))
      );
    } else {
      setActive('created');
      setQ(query(pinCollectionRef, where('postedby.name', '==', `${name}`)));
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto w-[90%] mt-5">
      <div className="flex flex-col items-center justify-center gap-3 mb-10">
        <UserImg photoUrl={photoURL} alt={name.slice(0, 1)} size={'100px'} />
        <span className="font-semibold text-3xl text-gray-700">{name}</span>

        <div className="flex mt-4 gap-2">
          <button
            id="created-pins"
            className={`${
              active === 'created' ? 'bg-red-500 text-white' : ''
            } font-semibold text-lg py-0.5 px-2.5 rounded-lg`}
            onClick={toggleHandler}
          >
            Created
          </button>
          <button
            id="saved-pins"
            className={`${
              active === 'saved' ? 'bg-red-500 text-white' : ''
            } font-semibold text-lg py-0.5 px-2.5 rounded-lg`}
            onClick={toggleHandler}
          >
            Saved
          </button>
        </div>
      </div>

      <PinsGrid q={q} />
    </div>
  );
};

export default UserProfile;
