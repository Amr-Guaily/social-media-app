import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchField = () => {
  const [serchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  return (
    // SearchField for large Screens
    <>
      <div className="hidden tablet:block flex-1 relative">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={serchTerm}
          className="w-full rounded-md py-2 pl-10 outline-none"
          onFocus={() => navigate('/serached')}
        />
        <AiOutlineSearch size={23} className="absolute top-[25%] left-[10px]" />
      </div>
    </>
  );
};

export default SearchField;
