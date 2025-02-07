// components/Button.jsx


import React, { forwardRef } from 'react';

const Button = forwardRef(({ buttonTitle }, ref) => {
  return (
    <button
      ref={ref}
      className="bg-blue-600 text-white p-3 rounded-full font-lexend hover:bg-blue-700"
    >
      {buttonTitle}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;