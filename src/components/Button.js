import React from 'react';

const Button = ({ content, className, id, clickHandler, value }) => {
  return (
    <button className={className} id={id} onClick={clickHandler} value={value}>
      {content}
    </button>
  );
};

export default Button;
