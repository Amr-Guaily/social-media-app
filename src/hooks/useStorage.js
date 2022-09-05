import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [alert, setAlert] = useState({ mesg: '', type: '' });

  function errorHandling(mesg, type = 'danger') {
    setAlert((prev) => ({ ...prev, mesg, type }));
    setTimeout(() => setAlert((prev) => ({ ...prev, mesg: '' })), 2000);
  }

  useEffect(() => {
    // If file is not exist
    if (!file) return;

    // Check file type (only upload images)
    const types = ['image/png', 'image/jpeg'];
    if (types.includes(file.type)) {
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
            resolve;
          });
        }
      );
    } else {
      errorHandling('pleace selecet an image (png or jpeg)');
    }
  }, [file]);

  return { progress, alert, url };
};

export default useStorage;
