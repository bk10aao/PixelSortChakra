import React from "react";
import SortPage from "../components/SortPage";
import { timSort } from "../Api";

export default function Tim() {
  return <SortPage algorithmName="Tim Sort" sortFunction={timSort} />;
}