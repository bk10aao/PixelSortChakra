import React from "react";
import SortPage from "../components/SortPage";
import { insertionSort } from "../Api";

export default function Insertion() {
  return <SortPage algorithmName="Insertion Sort" sortFunction={insertionSort} />;
}