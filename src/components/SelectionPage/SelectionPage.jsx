import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button"; 
import "./SelectionPage.scss";

function SelectionPage({ title, fetchUrl, saveUrl, nextPage }) {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get(fetchUrl, { withCredentials: true });
      setItems(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchItems();
  });

  const handleItemClick = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const saveItems = async () => {
    try {
      await axios.post(
        saveUrl,
        { items: selectedItems },
        { withCredentials: true }
      );
      navigate(nextPage);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="selection-page">
      <h1 className="selection-page__title">{title}</h1>
      <div className="selection-page__cloud">
        {items.map((item) => (
          <div
            key={item.id}
            className={`selection-page__tag ${
              selectedItems.includes(item.id)
                ? "selection-page__tag--selected"
                : ""
            }`}
            onClick={() => handleItemClick(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
      {/* <button className="selection-page__save-button" onClick={saveItems}>
        Save Selection
      </button> */}
      <Button 
        text="Save Selection" 
        onClick={saveItems} 
        className="selection-page__save-button" 
      />
    </div>
  );
}

export default SelectionPage;
