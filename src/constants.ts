export interface IFarmItem {
  price: number;
  icon: number;
  timeToGrow: number;
  sellPrice: number;
  points: number;
}

export interface ILevel {
  level: number;
  points: number;
}

export const levels: ILevel[] = [
  { level: 1, points: 0 },
  { level: 2, points: 20 },
  { level: 3, points: 40 },
  { level: 4, points: 60 },
  { level: 5, points: 100 },
  { level: 6, points: 150 },
  { level: 7, points: 250 },
  { level: 8, points: 350 },
  { level: 9, points: 500 },
  { level: 10, points: 1000 },
];

export const carrot: IFarmItem = {
  price: 10,
  icon: 0,
  timeToGrow: 1000 * 60,
  sellPrice: 15,
  points: 2,
};
export const potato: IFarmItem = {
  price: 20,
  icon: 1,
  timeToGrow: 1000 * 60 * 3,
  sellPrice: 35,
  points: 3,
};
export const tomato: IFarmItem = {
  price: 50,
  icon: 2,
  timeToGrow: 1000 * 60 * 5,
  sellPrice: 80,
  points: 5,
};
export const strawberry: IFarmItem = {
  price: 90,
  icon: 4,
  timeToGrow: 1000 * 60 * 7,
  sellPrice: 130,
  points: 10,
};

export const beetroot: IFarmItem = {
  price: 140,
  icon: 5,
  timeToGrow: 1000 * 60 * 9,
  sellPrice: 190,
  points: 15,
};
export const hive: IFarmItem = {
  price: 150,
  icon: 3,
  timeToGrow: 1000 * 60 * 10,
  sellPrice: 220,
  points: 20,
};

export const newFieldPrice: number = 100;
export const newFieldPoints: number = 30;
export const baseCash: number = 150;
