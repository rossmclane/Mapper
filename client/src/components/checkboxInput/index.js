import React from "react";

function CheckboxInput({ dataset, handleChange }) {
  return (
    <div>
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id={dataset.name}
        name={dataset.name}
        onClick={handleChange}
        checked={dataset.checked}
      ></input>
      <label class="form-check-label" for="defaultCheck1">
        {dataset.name}
      </label>
    </div>
  );
}

export default CheckboxInput;
