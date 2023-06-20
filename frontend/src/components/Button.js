import React from 'react';

function Button(props) {
  const { children, type = 'button', onClick, disabled = false } = props;

  return (
    <button
      onClick={onClick}
      className='bg-blue-600 w-40 h-14 text-white rounded  hover:scale-110'
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
