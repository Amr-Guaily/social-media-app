import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';

import { Link } from 'react-router-dom';
import { SearchField, UserImg } from '../../components/index';

const Navbar = ({ setShowSidebar }) => {
  const { currentUser } = useAuth();
  const { photoUrl, email, localId } = currentUser.reloadUserInfo;

  return (
    <div className="flex justify-between items-center gap-3 p-4 shadow-md tablet:shadow-none relative">
      <AiOutlineMenu
        size={25}
        className="cursor-pointer tablet:hidden"
        onClick={() => setShowSidebar(true)}
      />

      <SearchField />

      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="w-[120px] tablet:w-[140px] tablet:hidden"
        />
      </Link>

      <div className="flex justify-center items-center gap-2">
        <Link to={`/user-profile/${localId}`}>
          <UserImg photoUrl={photoUrl} alt={email.slice(0, 1)} size={'35px'} />
        </Link>

        <Link to="/create-pin">
          <div className="w-[35px] h-[35px] flex justify-center items-center bg-black/80 rounded-md overflow-hidden cursor-pointer">
            <AiOutlinePlus size={23} className="text-white font-semibold" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
