import { createContext, Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  IFarmItem,
  newFieldPrice,
  baseCash,
  newFieldPoints,
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
  setCoins: Dispatch<SetStateAction<number>>;
  gardenField: number;
  setGardenField: Dispatch<SetStateAction<number>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
  fields: IField[];
  setFields: Dispatch<SetStateAction<IField[]>>;
  plant: (farmItem: IFarmItem, id?: string) => void;
  buyField: () => void;
  harvest: (fieldToHarvest: IField) => void;
}>({
  coins: baseCash,
  setCoins: () => {},
  gardenField: 1,
  setGardenField: () => {},
  level: 1,
  setLevel: () => {},
  points: 0,
  setPoints: () => {},
  fields: {} as IField[],
  setFields: () => {},
  plant: () => {},
  buyField: () => {},
  harvest: () => {},
});

export const GardenProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [coins, setCoins] = useState<number>(baseCash);
  const [gardenField, setGardenField] = useState<number>(1);
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

  useEffect(() => {
    points >= 1000
      ? setLevel(10)
      : points >= 500
      ? setLevel(9)
      : points >= 350
      ? setLevel(8)
      : points >= 250
      ? setLevel(7)
      : points >= 150
      ? setLevel(6)
      : points >= 100
      ? setLevel(5)
      : points >= 60
      ? setLevel(4)
      : points >= 40
      ? setLevel(3)
      : points >= 20
      ? setLevel(2)
      : setLevel(1);
  }, [points]);

  useEffect(() => {
    setCoins((prev) => prev + level * 10);
  }, [level]);

  // useEffect(() => {
  //   console.log(fields);
  // }, [fields]);
  return (
    <GardenContext.Provider
      value={{
        coins,
        setCoins,
        gardenField,
        setGardenField,
        level,
        setLevel,
        points,
        setPoints,
        fields,
        setFields,
        plant,
        buyField,
        harvest,
      }}
    >
      {children}
    </GardenContext.Provider>
  );
};
