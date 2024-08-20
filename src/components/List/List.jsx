import React from "react";
import ListItem from "../ListItem/ListItem";
import "./List.scss";

function List({ items, onOptionSelect, onDelete, showDeleteButton }) {
  return (
    <div className="list">
      {items.map((item, index) => (
        <ListItem
          key={index}
          label={item.label}
          options={item.options}
          onOptionSelect={onOptionSelect}
          showDeleteButton={showDeleteButton}
          onDelete={() => onDelete(item)}
        />
      ))}
    </div>
  );
}

export default List;
