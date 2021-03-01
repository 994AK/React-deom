import React from "react";

const FilterButton = (props) => {
  return (
    <button 
    id={props.id.toString()}
    type="button" 
    className="btn toggle-btn" 
    aria-pressed={props.completed}>
      <span className="visually-hidden">Show </span>
      <span >{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
};

export default FilterButton;
