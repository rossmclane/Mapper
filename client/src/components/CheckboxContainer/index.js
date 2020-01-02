import React from "react";
import "./style.css";

function CheckboxContainer({ children }) {
  return (
    <div id="hello" className="form-check">
      {children}
    </div>
  );
}

export default CheckboxContainer;
