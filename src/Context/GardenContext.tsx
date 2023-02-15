import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  IFarmItem,
  newFieldPrice,
  baseCash,
  newFieldPoints,
  levels,
} from "../constants";

const initialFields = [
  { plant: undefined, id: "0", createdAt: undefined, bought: true },
  { plant: undefined, id: "1", createdAt: undefined, bought: false },
  { plant: undefined, id: "2", createdAt: undefined, bought: false },
  { plant: undefined, id: "3", createdAt: undefined, bought: false },
  { plant: undefined, id: "4", createdAt: undefined, bought: false },
  { plant: undefined, id: "5", createdAt: undefined, bought: false },
  { plant: undefined, id: "6", createdAt: undefined, bought: false },
  { plant: undefined, id: "7", createdAt: undefined, bought: false },
  { plant: undefined, id: "8", createdAt: undefined, bought: false },
  { plant: undefined, id: "9", createdAt: undefined, bought: false },
  { plant: undefined, id: "10", createdAt: undefined, bought: false },
  { plant: undefined, id: "11", createdAt: undefined, bought: false },
  { plant: undefined, id: "12", createdAt: undefined, bought: false },
  { plant: undefined, id: "13", createdAt: undefined, bought: false },
  { plant: undefined, id: "14", createdAt: undefined, bought: false },
  { plant: undefined, id: "15", createdAt: undefined, bought: false },
  { plant: undefined, id: "16", createdAt: undefined, bought: false },
  { plant: undefined, id: "17", createdAt: undefined, bought: false },
  { plant: undefined, id: "18", createdAt: undefined, bought: false },
  { plant: undefined, id: "19", createdAt: undefined, bought: false },
  { plant: undefined, id: "20", createdAt: undefined, bought: false },
  { plant: undefined, id: "21", createdAt: undefined, bought: false },
  { plant: undefined, id: "22", createdAt: undefined, bought: false },
  { plant: undefined, id: "23", createdAt: undefined, bought: false },
];

export interface IField {
  plant: IFarmItem | undefined;
  id: string;
  createdAt: number | undefined;
  bought: boolean;
}

export const GardenContext = createContext<{
  coins: number;
  level: number;
  points: number;
  fields: IField[];
  plant: (farmItem: IFarmItem, id?: string) => void;
  buyField: () => void;
  harvest: (fieldToHarvest: IField) => void;
  beeClick: () => void;
}>({
  coins: baseCash,
  level: 1,
  points: 0,
  fields: {} as IField[],
  plant: () => {},
  buyField: () => {},
  harvest: () => {},
  beeClick: () => {},
});

export const GardenProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [coins, setCoins] = useState<number>(baseCash);
  const [level, setLevel] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);
  const [fields, setFields] = useState<IField[]>(initialFields);

  const plant = (farmItem: IFarmItem, id?: string) => {
    setCoins((prev) => prev - farmItem.price);
    setPoints((prev) => prev + farmItem.points);
    let emptyFieldsArr = fields.filter(
      (field) => field.bought && field.plant === undefined
    );
    setFields((prev) => {
      return prev.map((field) => {
        return emptyFieldsArr[0].id === field.id
          ? { ...field, plant: farmItem, createdAt: Date.now() }
          : field;
      });
    });
  };

  const buyField = () => {
    setCoins((prev) => prev - newFieldPrice);
    setPoints((prev) => prev + newFieldPoints);
    let unsoldFields = fields.filter((field) => !field.bought);
    setFields((prev) => {
      return prev.map((field) =>
        unsoldFields[0].id === field.id ? { ...field, bought: true } : field
      );
    });
  };

  const harvest = (fieldToHarvest: IField) => {
    setCoins(
      (prev) =>
        prev + (fieldToHarvest.plant ? fieldToHarvest.plant.sellPrice : 0)
    );

    setFields((prev) => {
      return prev.map((field) =>
        fieldToHarvest.id === field.id
          ? { ...field, plant: undefined, createdAt: undefined }
          : field
      );
    });
  };

  const beeClick = () => {
    setCoins((prev) => prev + 5);
  };

  useEffect(() => {
    const nextLevel = levels.find((el) => el.points > points)?.level;
    setLevel(nextLevel ? nextLevel - 1 : 10);
  }, [points]);

  useEffect(() => {
    console.log("coins addded in level", level);
    level > 1 && setCoins((prev) => prev + level * 10);
  }, [level]);

  useEffect(() => {
    console.log(coins);
  }, [coins]);

  return (
    <GardenContext.Provider
      value={{
        coins,
        level,
        points,
        fields,
        plant,
        buyField,
        harvest,
        beeClick,
      }}
    >
      {children}
    </GardenContext.Provider>
  );
};
