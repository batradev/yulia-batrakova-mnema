import React, { useState } from "react";
import "./ListItem.scss";
import { ReactComponent as DeleteIcon } from "../../assets/icon-delete.svg"; 

function ListItem({ label, options, onOptionSelect, showDeleteButton, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="list-item">
      <div className="list-item__header">
        <div className="list-item__label" onClick={toggleDropdown}>
          {label}
        </div>
        {showDeleteButton && (
          <button className="list-item__delete-button" onClick={onDelete}>
            <DeleteIcon />
          </button>
        )}
      </div>
      {isOpen && (
        <div className="list-item__dropdown">
          <ul className="list-item__options">
            {options.map((option, index) => (
              <li
                key={index}
                className="list-item__option"
                onClick={() => {
                  onOptionSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ListItem;
