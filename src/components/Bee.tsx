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
      const beeInterval = setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  }, [isOpen]);

  useEffect(() => {
    const bee = document.getElementById("beeBee");
    const interval = setInterval(() => {
      const randomY = randomNumber(0, window.innerHeight - 150);
      const randomX = randomNumber(0, window.innerWidth - 150);
      bee!.style.top = `${randomY}px`;
      bee!.style.left = `${randomX}px`;
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <button className="bee" id="beeBee" onClick={handleClick}>
      <img src={beePic} alt="bee" /> {isOpen && <p>+1$!</p>}
    </button>
  );
}

export default Bee;
