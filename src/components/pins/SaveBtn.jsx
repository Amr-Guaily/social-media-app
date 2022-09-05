import { useState } from 'react';
import { pinCollectionRef, userscolectionRef } from '../../lib/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const SaveBtn = ({ saves, pinId }) => {
  const {
    currentUser: {
      reloadUserInfo: { localId },
    },
  } = useAuth();
  const [isSaved, setIsSaved] = useState(
    !!saves.filter((id) => id === localId).length
  );

  function saveHandler(e) {
    e.stopPropagation();

    const pinRef = doc(pinCollectionRef, `${pinId}`);
    const userRef = doc(userscolectionRef, `${localId}`);

    if (!isSaved) {
      updateDoc(pinRef, { saves: arrayUnion(localId) }).then(
        updateDoc(userRef, { savedPins: arrayUnion(pinId) }).then(() =>
          setIsSaved(true)
        )
      );
    } else {
      updateDoc(pinRef, { saves: arrayRemove(localId) }).then(
        updateDoc(userRef, { savedPins: arrayRemove(pinId) }).then(() =>
          setIsSaved(false)
        )
      );
    }
  }

  return (
    <button
      className={`${
        isSaved ? ' bg-black/90' : 'bg-red-700'
      } text-white py-0.5 px-3 rounded-lg`}
      onClick={saveHandler}
    >
      {isSaved ? 'saved' : 'save'}
    </button>
  );
};

export default SaveBtn;
