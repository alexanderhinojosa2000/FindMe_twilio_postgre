import React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

const STYLES = ['btn1--primary1', 'btn1--outline1', 'btn1--test1'];

const SIZES = ['btn1--medium1', 'btn1--large1'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    // <Link to='/sign-up' className='btn-mobile'>
      <button
        className={`btn1 ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    // </Link>
  );
};

