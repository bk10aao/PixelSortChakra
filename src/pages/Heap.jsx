import React from "react";
import SortPage from "../components/SortPage";
import { heapSort } from "../Api";

export default function Heap() {
  return <SortPage algorithmName="Heap Sort" sortFunction={heapSort} />;
}