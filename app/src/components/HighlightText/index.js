import React from 'react';
import './highlight-text.css';

function Highlight({ text, search }) {
  if (!search) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="highlight">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default Highlight;