import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function AnimatedInput({ label, value, onChange, id = 'input', type = 'text', disabled }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isFilled = value && value.length > 0;
  return (
    <div className="relative w-full max-w-sm">
      <input
        id={id}
        type={isPassword && !showPassword ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`
          peer
          w-full
          border border-gray-300
          rounded-md
          mb-5
          px-3 pt-4 pb-4 pr-10
          text-base text-black bg-transparent
          focus:outline-none
          focus:border-[#790022]
          focus:ring-1 focus:ring-[#790022]
          placeholder-transparent
          transition-all duration-200
        `}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-3
          transition-all duration-200
          ${isFilled ? '-top-3 text-sm text-[#790022] bg-white px-1 py-0.5' : 'top-3.5 text-base text-gray-400'}
          peer-placeholder-shown:top-3.5
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-placeholder: hover: cursor-text
          peer-focus:-top-3.5
          peer-focus:text-sm
          peer-focus:text-[#790022]
          peer-focus:bg-white
          peer-focus:px-1 peer-focus:py-0.5
        `}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-5 text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
          tabIndex={-1}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      )}
    </div>
  );
}
