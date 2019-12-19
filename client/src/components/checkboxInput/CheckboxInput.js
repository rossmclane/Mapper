import React from "react";

function CheckboxInput(props) {
  return (
    <div>
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck1"
      ></input>
      <label class="form-check-label" for="defaultCheck1">
        Dataset
      </label>
    </div>
  );
}

export default CheckboxInput;
