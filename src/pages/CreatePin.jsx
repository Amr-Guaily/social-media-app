import { useState } from 'react';
import { useUpload } from '../context/UploadContext';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { categories } from '../assets/DummyData';
import { UserImg } from '../components';
import { useAuth } from '../context/AuthContext';

const CreatePin = () => {
  const [formData, setFormData] = useState({
    title: '',
    about: '',
    category: '',
  });

  const { uploadHandler, fileHandler, progress, url, alert, loading } =
    useUpload();
  const { currentUser } = useAuth();
  const { photoUrl, email, displayName } = currentUser.reloadUserInfo;

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function submitHandler(e) {
    e.preventDefault();
    uploadHandler(formData);
  }

  return (
    <>
      {alert && (
        <div className="w-[80%] min-w-[300px] px-3 mx-auto my-4 font-semibold text-white h-10 flex items-center justify-center rounded-md bg-red-500 animate-show-in">
          <p>{alert}</p>
        </div>
      )}

      <form
        className="w-[90%] mt-10 rounded-md mx-auto flex flex-col laptop:flex-row justify-center items-center gap-4 bg-white p-5 relative"
        onSubmit={submitHandler}
      >
        {/* Left Side */}
        <div className="bg-gray-200 w-full laptop:max-w-[380px] h-[340px] p-3 relative">
          {/* progress par */}
          <div
            className=" absolute h-1 top-[-4px] left-0 bg-blue-500"
            style={{ width: `${progress}%` }}
          />
          {/* Image Preview */}
          {url ? (
            <img
              src={url}
              alt="uploaded-img"
              className="h-full w-full object-contain mx-auto"
            />
          ) : (
            <label className="h-full flex items-center justify-center border-dotted border-2 border-gray-400 cursor-pointer">
              <input
                type="file"
                className="w-0 h-0"
                required
                onChange={(e) => fileHandler(e.target.files[0])}
              />
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
              required
              value={formData.category}
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
          disabled={loading}
          className="self-end laptop:absolute bottom-4 right-4 py-1 px-3 bg-red-500 cursor-pointer text-white font-semibold rounded-xl"
        >
          {!loading ? 'Submit' : 'Processing...'}
        </button>
      </form>
    </>
  );
};

export default CreatePin;
