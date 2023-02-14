import { filledInputClasses } from "@mui/material";
import React from "react";
import { useContext } from "react";
import {
  carrot,
  potato,
  tomato,
  hive,
  strawberry,
  beetroot,
} from "../constants";
import { GardenContext } from "../Context/GardenContext";
import "./Options.scss";
import { levels, ILevel } from "../constants";

function Options() {
  const { coins, level, plant, buyField, fields, points } =
    useContext(GardenContext);
  const emptyFieldsArr = fields.filter(
    (field) => field.bought && field.plant === undefined
  );

  const boughtFieldsArr = fields.filter((field) => field.bought);
  const pointsToNextLevel = levels.find(
    (lvl: ILevel) => lvl.level - 1 === level
  )?.points;
  const currentPointsToPercent = (points * 100) / pointsToNextLevel!;

  return (
    <div className="options">
      <button
        className={`carrots  ${
          coins < 10 || !emptyFieldsArr[0] ? "disabledButton" : ""
        }`}
        onClick={() => plant(carrot)}
        disabled={coins < 10 || !emptyFieldsArr[0]}
      >
        carrots $10
      </button>
      <button
        className={`potatoes  ${
          coins < 20 || !emptyFieldsArr[0] ? "disabledButton" : ""
        }`}
        onClick={() => plant(potato)}
        disabled={coins < 20 || !emptyFieldsArr[0]}
      >
        potatoes $20
      </button>
      <button
        className={`tomatoes  ${
          coins < 50 || !emptyFieldsArr[0] ? "disabledButton" : ""
        }`}
        onClick={() => plant(tomato)}
        disabled={coins < 50 || !emptyFieldsArr[0]}
      >
        tomatoes $50
      </button>

      <button
        className={`strawberry  ${
          coins < 90 || !emptyFieldsArr[0] ? "disabledButton" : ""
        }`}
        onClick={() => plant(strawberry)}
        disabled={coins < 90 || !emptyFieldsArr[0]}
      >
        strawberry $90
      </button>

      <button
        className={`beetroot  ${
          coins < 140 || !emptyFieldsArr[0] ? "disabledButton" : ""
        }`}
        onClick={() => plant(beetroot)}
        disabled={coins < 90 || !emptyFieldsArr[0]}
      >
        beetroot $140
      </button>

      <button
        className={`bees  ${
          coins < 150 || !emptyFieldsArr[0] ? "disabledButton" : ""
        }`}
        onClick={() => plant(hive)}
        disabled={coins < 150 || !emptyFieldsArr[0]}
      >
        hive $150
      </button>
      <button
        className={`newField  ${coins < 100 ? "disabledButton" : ""}`}
        onClick={buyField}
        disabled={coins < 100 || boughtFieldsArr.length === 24}
      >
        buy new field $100
      </button>
      <div className="info">
        <p>{coins}$</p>

        <div
          className="progress__circle"
          style={{
            backgroundImage: `conic-gradient(#6ca032 ${currentPointsToPercent}%, #8dbe55 ${currentPointsToPercent}%)`,
          }}
        >
          <div className="circle">
            <p>lvl {level}</p>
            <p>
              {points} /{pointsToNextLevel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
