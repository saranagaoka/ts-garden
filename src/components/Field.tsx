import React from "react";
import { GardenContext, IField } from "../Context/GardenContext";
import "./Field.scss";
import {
  GiCarrot,
  GiPotato,
  GiTomato,
  GiStrawberry,
  GiBeet,
} from "react-icons/gi";
import { BiHive } from "react-icons/bi";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

function Field({ field }: { field: IField }) {
  const soilPic = require("./images/soilGarden.png");
  const plantsArr = [
    <GiCarrot />,
    <GiPotato />,
    <GiTomato />,
    <BiHive />,
    <GiStrawberry />,
    <GiBeet />,
  ];
  const [ready, setReady] = useState(false);
  const { harvest } = useContext(GardenContext);
  const plants = [
    field.plant && plantsArr[field.plant.icon],
    field.plant && plantsArr[field.plant.icon],
    field.plant && plantsArr[field.plant.icon],
  ];
  useEffect(() => {
    console.log(ready);
  }, []);

  const handleClick = () => {
    harvest(field);
    setReady(false);
  };

  useEffect(() => {
    field.createdAt &&
      setTimeout(() => {
        setReady(true);
      }, field.plant?.timeToGrow);
  }, [field.plant?.timeToGrow, field.createdAt]);

  return (
    <div className={`field ${field.bought ? "" : "grayOut"}`}>
      <img src={soilPic} alt="soil" />
      <div className="field__planted">
        {ready ? (
          <button className="harvest__button" onClick={handleClick}>
            HARVEST!
          </button>
        ) : (
          <div className="plants">{plants.map((plantIcon) => plantIcon)}</div>
        )}
      </div>
    </div>
  );
}

export default Field;
