import React from "react";
import Field from "./Field";
import "./GardenGrid.scss";

import { useContext } from "react";
import { GardenContext } from "../Context/GardenContext";

function GardenGrid() {
  const { fields } = useContext(GardenContext);
  return (
    <>
      <div className="gardenGrid">
        {fields.slice(0, 12).map((field) => (
          <Field key={field.id} field={field} />
        ))}
      </div>
      <div className="gardenGrid">
        {fields.slice(12, 24).map((field) => (
          <Field key={field.id} field={field} />
        ))}
      </div>
    </>
  );
}

export default GardenGrid;
