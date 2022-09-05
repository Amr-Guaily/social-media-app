import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { UserImg, SaveBtn } from '../index';

const Pin = ({ pinData }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const { url, saves, formData, id, postedby } = pinData;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/pin-details/${id}`)}
      className="mb-4 break-inside-avoid cursor-zoom-in shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out relative"
    >
      <img
        src={url}
        alt={formData.title}
        className="min-h-[150px] object-cover"
      />

      {hover && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/20">
          <a
            href={url}
            target="blank"
            download
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute top-3 left-3 bg-white w-9 h-9 p-2 rounded-full flex justify-center items-center text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
          >
            {' '}
            <MdDownloadForOffline />
          </a>

          <div className="absolute top-4 right-4">
            <SaveBtn saves={saves} pinId={id} />
          </div>

          <Link
            to={`/user-profile/${postedby.id}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute bottom-0 flex items-center gap-2 bg-white/30 w-full p-2 hover:bg-white/60"
          >
            <UserImg
              photoUrl={postedby.photoUrl}
              alt={postedby.name.slice(0, 1)}
              size={'30px'}
            />
            <h3 className="font-semibold text-lg">{postedby.name}</h3>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Pin;
