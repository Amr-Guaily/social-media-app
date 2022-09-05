import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { pinCollectionRef } from '../../lib/firebase';
import { UserImg } from '../index';

const Comments = ({ pinId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const { currentUser } = useAuth();

  const { photoUrl, email, localId, displayName } = currentUser.reloadUserInfo;

  useEffect(() => {
    const pinRef = doc(pinCollectionRef, `${pinId}`);
    const commentsRef = collection(pinRef, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const unsb = onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => doc.data());
      setComments(comments);
    });

    return () => unsb;
  }, []);

  function commentHandler() {
    const commentRef = doc(pinCollectionRef, `${pinId}`, 'comments', localId);
    setDoc(commentRef, {
      createdAt: serverTimestamp(),
      text: comment,
      name: displayName ? displayName : email.split('@')[0],
      photoUrl: photoUrl ? photoUrl : null,
    }).then(() => {
      setComment('');
      setShow(true);
    });
  }

  return (
    <>
      <h3 className="font-semibold text-xl mt-6 text-black/70 flex items-center gap-2">
        {comments.length} Comments{' '}
        <div className="mt-1 cursor-pointer" onClick={() => setShow(!show)}>
          {' '}
          {show ? <FaAngleDown /> : <FaAngleRight />}
        </div>
      </h3>

      {show && (
        <div className="mt-2 px-5 max-h-[100px] bg-gray-100 rounded-lg overflow-auto">
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="flex items-center gap-x-2 flex-wrap my-3 justify-start"
            >
              <UserImg
                photoUrl={comment.photoUrl}
                alt={comment.name.slice(0, 1)}
                size={'30px'}
              />
              <h3 className="font-semibold text-lg">{comment.name}</h3>
              <p className="">{comment.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-8">
        <UserImg photoUrl={photoUrl} alt={email.slice(0, 1)} />
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          className="flex-1 rounded-xl outline-none text-lg border border-black/40 py-1 px-3"
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={!comment.trim()}
          onClick={commentHandler}
          className="py-1 px-4 bg-red-500 hover:brightness-95 text-white font-semibold rounded-xl disabled:bg-opacity-70"
        >
          Done
        </button>
      </div>
    </>
  );
};

export default Comments;
