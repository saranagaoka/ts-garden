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
  const [time, setTime] = useState<number | undefined>(undefined);
  const { harvest } = useContext(GardenContext);

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

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (field.createdAt) {
      console.log(field.plant);
      interval = setInterval(() => {
        const timeLeft =
          field.plant?.timeToGrow! + field.createdAt! - Date.now();
        setTime(timeLeft);
        console.log(timeLeft);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.createdAt]);

  return (
    <div className={`field ${field.bought ? "" : "grayOut"}`}>
      <img src={soilPic} alt="soil" />
      <div className="field__planted">
        <div className="timer">
          {time && time > 0 && `${Math.floor(time / 1000)}s`}
        </div>
        {ready && (
          <button className="harvest__button" onClick={handleClick}>
            {`HARVEST! $${field.plant?.sellPrice}`}
          </button>
        )}
        <div className="plants">
          {field.plant &&
            [...Array(3).keys()].map((_) => plantsArr[field.plant!.icon])}
        </div>
      </div>
    </div>
  );
}

export default Field;
