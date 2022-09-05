import { createContext, useContext, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, pinCollectionRef } from '../lib/firebase';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UploadContext = createContext({
  uploadHandler: (file, formData) => {},
  fileHandler: (file) => {},
  url: null,
  progress: 0,
  loading: false,
  alert: '',
});

export function useUpload() {
  return useContext(UploadContext);
}

export const UploadProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ mesg: '', type: '' });

  const navigate = useNavigate();

  const { email, displayName, photoUrl, localId } = currentUser.reloadUserInfo;

  function errorHandling(mesg, type = 'danger') {
    setAlert((prev) => ({ ...prev, mesg, type }));
    setTimeout(() => setAlert((prev) => ({ ...prev, mesg: '' })), 2500);
  }

  function fileHandler(file) {
    setFile(file);

    const types = ['image/png', 'image/jpeg', 'image/webp', 'image/jfif'];
    if (types.includes(file.type)) {
      return new Promise((resolve) => {
        // Create References
        const storageRef = ref(storage, `pins/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (err) => errorHandling(err.code),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              setUrl(downloadUrl);
              setProgress(0);
              resolve(downloadUrl);
            });
          }
        );
      });
    } else {
      errorHandling('pleace selecet a valid image type');
    }
  }

  async function createDoc(pinDoc) {
    await addDoc(pinCollectionRef, pinDoc);
    navigate('/', { replace: true });
    setLoading(false);
  }

  function uploadHandler(formData) {
    setLoading(true);
    const pinDoc = {
      createdAt: serverTimestamp(),
      url,
      formData,
      postedby: {
        id: localId,
        name: displayName ? displayName : email.split('@')[0],
        photoUrl: photoUrl ? photoUrl : null,
      },
      saves: [],
    };

    if (!url) {
      fileHandler(file).then((url) => {
        setTimeout(() => {
          createDoc({ ...pinDoc, url });
        }, [2500]);
      });
    } else {
      createDoc(pinDoc);
    }
  }

  const context = {
    uploadHandler,
    fileHandler,
    url,
    progress,
    alert: alert.mesg,
    loading,
  };

  return (
    <UploadContext.Provider value={context}>{children}</UploadContext.Provider>
  );
};
