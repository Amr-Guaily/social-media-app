import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const PassInput = ({
  password,
  changeHandler,
  placeholder = 'password',
  name = 'password',
}) => {
  const [passVisibility, setPassVisibility] = useState(false);

  return (
    <div className="relative">
      <input
        type={passVisibility ? 'text' : 'password'}
        placeholder={placeholder}
        required
        name={name}
        value={password}
        onChange={changeHandler}
        className="glass-input"
      />

      <div
        className="absolute bottom-[45%] right-[18px] cursor-pointer text-2xl"
        onClick={() => setPassVisibility(!passVisibility)}
      >
        {passVisibility ? (
          <AiOutlineEye className="pointer-events-none" />
        ) : (
          <AiOutlineEyeInvisible className="pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default PassInput;
