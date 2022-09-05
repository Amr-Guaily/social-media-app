import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserImg } from '../index';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { categories } from '../../assets/DummyData';

const Sidebar = ({ setShowSidebar }) => {
  const { currentUser } = useAuth();

  const notActiveLink = 'flex items-center gap-4 text-xl my-3';
  const activeLink =
    'flex items-center gap-4 text-xl my-3 border-r-4 border-black';

  const { localId, photoUrl, email, displayName } = currentUser.reloadUserInfo;

  function handleClick() {
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    } else {
      return;
    }
  }

  return (
    <div className="tablet:fixed min-w-[240px] h-screen py-4 pl-4 overflow-hidden hover:overflow-auto flex flex-col justify-start">
      <div className="flex justify-between items-center mt-1.5 mb-4 pr-4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[100px] mobile:w-[130px]" />
        </Link>
        <AiOutlineCloseCircle
          size={24}
          className="cursor-pointer tablet:hidden"
          onClick={() => setShowSidebar(false)}
        />
      </div>

      <div onClick={handleClick}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : notActiveLink)}
        >
          <FaHome size={26} />
          <h3 className="font-semibold text-xl">Home</h3>
        </NavLink>
      </div>

      {/* Categories */}
      <div className="my-4">
        <h3 className="font-semibold text-xl">Discover Categories</h3>
        <ul className="my-2">
          {categories.slice(0, categories.length - 1).map((category) => (
            <li key={category.name} onClick={handleClick}>
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? activeLink : notActiveLink
                }
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-[35px] h-[35px] rounded-full object-cover"
                />
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="transition-all duration-300 ease-in-out hover:translate-y-[-10px] mt-auto"
        onClick={handleClick}
      >
        <Link
          to={`/user-profile/${localId}`}
          className="mb-2 mr-4 p-3 bg-gray-200 rounded-md shadow-lg flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <UserImg photoUrl={photoUrl} alt={email.slice(0, 1)} />
            <h3 className="font-semibold text-lg">
              {displayName ? displayName : email.split('@')[0]}
            </h3>
          </div>
          <IoIosArrowForward className="mt-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
