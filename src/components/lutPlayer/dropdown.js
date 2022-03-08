import React, { useState } from "react";

export const Dropdown = ({ lutMap, setSelection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [haveText, setHaveText] = useState("");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleText = (ev) => {
    setHaveText(ev.currentTarget.textContent);

    setSelection(ev.currentTarget.textContent);
  };

  const itemList = (props) => {
    const list = props.map((item) => (
      <div
        onClick={handleText}
        className="dropdown__item"
        key={item.toString()}
      >
        {item}
      </div>
    ));

    return <div className="dropdown__items"> {list} </div>;
  };

  return (
    <div
      className={isOpen ? "dropdown active" : "dropdown"}
      onClick={handleClick}
    >
      <div className="dropdown__text">
        {!haveText ? "Select LUT" : haveText}
      </div>
      {itemList(Object.keys(lutMap))}
    </div>
  );
};
