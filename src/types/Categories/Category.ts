import { City } from "types/Cities/City";

export interface Category {
    categoryNumber: number;
    categoryName: string;
    cities?: City[];
  }