import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import { categories } from '../assets/DummyData';
import { UserImg } from '../components';
import { useAuth } from '../context/AuthContext';
import { addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { pinCollectionRef, storage } from '../lib/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const CreatePin = () => {
  const [formData, setFormData] = useState({
    title: '',
    about: '',
    category: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { photoUrl, email, displayName, localId } = currentUser.reloadUserInfo;

  const fileHandler = (e) => {
    const types = ['image/png', 'image/jpeg', 'image/webp', 'image/jfif'];
    const reader = new FileReader();

    const selectedFile = e.target.files[0];
    if (types.includes(selectedFile.type)) {
      reader.readAsDataURL(selectedFile);
    }
    reader.onload = (e) => {
      setFile(e.target.result);
    };
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const docRef = await addDoc(pinCollectionRef, {
      createdAt: serverTimestamp(),
      formData,
      postedby: {
        id: localId,
        name: displayName ? displayName : email.split('@')[0],
        photoUrl: photoUrl ? photoUrl : null,
      },
      saves: [],
    });

    const storageRef = ref(storage, `pins/${formData.title}`);
    await uploadString(storageRef, file, 'data_url').then(async () => {
      const downloadUrl = await getDownloadURL(storageRef);
      await updateDoc(doc(pinCollectionRef, docRef.id), {
        url: downloadUrl,
      });
    });

    navigate('/', { replace: true });
  }

  return (
    <>
      {/* {alert && (
        <div className="w-[80%] min-w-[300px] px-3 mx-auto my-4 font-semibold text-white h-10 flex items-center justify-center rounded-md bg-red-500 animate-show-in">
          <p>{alert}</p>
        </div>
      )} */}

      <form
        className="w-[90%] mt-10 rounded-md mx-auto flex flex-col laptop:flex-row justify-center items-center gap-4 bg-white p-5 relative"
        onSubmit={submitHandler}
      >
        {/* Left Side */}
        <div className="bg-gray-200 w-full laptop:max-w-[380px] h-[340px] p-3 relative">
          {/* Image Preview */}
          {file ? (
            <div className="relative h-full w-full ">
              <img src={file} alt="uploaded-img" className="h-full w-full" />
              <GrFormClose
                size={24}
                className="absolute top-2 left-2 cursor-pointer bottom-1 rounded-full shadow-md bg-white/60 hover:bg-white/90"
                onClick={() => setFile(null)}
              />
            </div>
          ) : (
            <label className="h-full flex items-center justify-center border-dotted border-2 border-gray-400 cursor-pointer">
              <input type="file" hidden onChange={fileHandler} />
              <div className="font-semibold">
                <AiOutlineCloudUpload size={26} className="mx-auto" />
                <p>Click To Upload</p>
              </div>
            </label>
          )}
        </div>

        {/* Right Side */}
        <div className="w-full laptop:h-[340px] flex flex-col justify-start items-start gap-6">
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={changeHandler}
            placeholder="Pin Title"
            className="w-full p-1.5 border-b-3 outline-none text-lg tablet:text-xl border-b-2 border-gray-200"
          />

          <div className="flex items-center gap-2">
            <UserImg photoUrl={photoUrl} alt={email.slice(0, 1)} />
            <h3 className="font-semibold text-lg">
              {displayName ? displayName : email.split('@')[0]}
            </h3>
          </div>

          <input
            type="text"
            name="about"
            required
            value={formData.about}
            onChange={changeHandler}
            placeholder="Tell Every One What Your Pin About"
            className="w-full p-1.5 border-b-3 outline-none text-lg tablet:text-xl border-b-2 border-gray-200"
          />

          <div className="w-full mb-3">
            <h3 className=" font-semibold text-xl mb-3">Choose Pin Category</h3>
            <select
              name="category"
              value={formData.category}
              required
              onChange={changeHandler}
              className="w-[80%] p-1.5 border-b-3 outline-none text-lg tablet:text-xl border-b-2 border-gray-200"
            >
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          disabled={!file}
          className="self-end laptop:absolute bottom-4 right-4 py-1 px-3 bg-red-500 text-white font-semibold rounded-xl disabled:bg-opacity-70"
        >
          {!loading ? 'Submit' : 'Processing...'}
        </button>
      </form>
    </>
  );
};

export default CreatePin;
