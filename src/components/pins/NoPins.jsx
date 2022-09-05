import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NoPins = ({ msg }) => {
  return (
    <div className="flex items-center justify-center gap-2 w-[90%] mx-auto mt-40">
      <p className="font-semibold text-3xl">No Pins Here, Start Add Some</p>
      <Link
        to="/create-pin"
        className="mt-1.5 cursor-pointer text-sky-600 hover:translate-x-2 transition-all duration-200"
      >
        <AiOutlineArrowRight size={20} />
      </Link>
    </div>
  );
};

export default NoPins;
