import React, { useContext, useEffect, useState } from "react";

import { GardenContext } from "../Context/GardenContext";
import "./Bee.scss";

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const beePic = require("./images/bee.png");
function Bee() {
  const { beeClick } = useContext(GardenContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    beeClick();
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  }, [isOpen]);

  useEffect(() => {
    let prevX = 0;
    const bee = document.getElementById("beeBee");
    const beeImg = document.getElementById("beeImg");
    const interval = setInterval(() => {
      const randomY = randomNumber(0, window.innerHeight - 150);
      const randomX = randomNumber(0, window.innerWidth - 150);
      bee!.style.top = `${randomY}px`;
      bee!.style.left = `${randomX}px`;
      beeImg!.style.transform = `scaleX(${randomX < prevX ? "-1" : "1"})`;
      prevX = randomX;
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <button className="bee" id="beeBee" onClick={handleClick}>
      <img src={beePic} alt="bee" id="beeImg" /> {isOpen && <p>+5$!</p>}
    </button>
  );
}

export default Bee;
