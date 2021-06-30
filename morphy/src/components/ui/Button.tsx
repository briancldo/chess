import React from 'react';

import './Button.css';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  any?: unknown;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button {...props} className='custom-button'>
      {props.children}
    </button>
  );
};

export default Button;
