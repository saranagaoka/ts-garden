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
          coins < 20 || !emptyFieldsArr[0] || level < 2 ? "disabledButton" : ""
        }`}
        onClick={() => plant(potato)}
        disabled={coins < 20 || !emptyFieldsArr[0] || level < 2}
      >
        {level < 2 ? "reach lvl 2" : "potatoes $20"}
      </button>
      <button
        className={`tomatoes  ${
          coins < 50 || !emptyFieldsArr[0] || level < 4 ? "disabledButton" : ""
        }`}
        onClick={() => plant(tomato)}
        disabled={coins < 50 || !emptyFieldsArr[0] || level < 4}
      >
        {level < 4 ? "reach lvl 4" : "tomatoes $50"}
      </button>

      <button
        className={`strawberry  ${
          coins < 90 || !emptyFieldsArr[0] || level < 6 ? "disabledButton" : ""
        }`}
        onClick={() => plant(strawberry)}
        disabled={coins < 90 || !emptyFieldsArr[0] || level < 6}
      >
        {level < 6 ? "reach lvl 6" : "strawberry $90"}
      </button>

      <button
        className={`beetroot  ${
          coins < 140 || !emptyFieldsArr[0] || level < 7 ? "disabledButton" : ""
        }`}
        onClick={() => plant(beetroot)}
        disabled={coins < 140 || !emptyFieldsArr[0] || level < 7}
      >
        {level < 7 ? "reach lvl 7" : "beetroot $140"}
      </button>

      <button
        className={`bees  ${
          coins < 150 || !emptyFieldsArr[0] || level < 8 ? "disabledButton" : ""
        }`}
        onClick={() => plant(hive)}
        disabled={coins < 150 || !emptyFieldsArr[0] || level < 8}
      >
        {level < 8 ? "reach lvl 8" : "hive $150"}
      </button>
      <button
        className={`newField  ${
          coins < 100 || boughtFieldsArr.length === 24 ? "disabledButton" : ""
        }`}
        onClick={buyField}
        disabled={coins < 100 || boughtFieldsArr.length === 24}
      >
        field $100
      </button>
      <div className="info">
        <p>${coins}</p>

        <div
          className="progress__circle"
          style={{
            backgroundImage: `conic-gradient(#6ca032 ${currentPointsToPercent}%, #8dbe55 ${currentPointsToPercent}%)`,
          }}
        >
          <div className="circle">
            <p>lvl {level === 10 ? "" : level}</p>
            <p>
              {level === 10 ? "max lvl" : `${points} / ${pointsToNextLevel!}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
