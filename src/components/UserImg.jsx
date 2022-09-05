const UserImg = ({ photoUrl, alt, size = '40px' }) => {
  return (
    <div
      style={{ width: `${size}`, height: `${size}` }}
      className="flex justify-center items-center bg-gray-300 rounded-full overflow-hidden cursor-pointer"
    >
      {photoUrl ? (
        <img src={photoUrl} alt="user-img" className="w-full object-cover" />
      ) : (
        <span
          className="uppercase font-semibold text-xl text-gray-600 mt-[-3px]"
          style={{ fontSize: `calc(${size} / 2)` }}
        >
          {alt}
        </span>
      )}
    </div>
  );
};

export default UserImg;
