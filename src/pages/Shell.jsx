import React from "react";
import SortPage from "../components/SortPage";
import { shellSort } from "../Api";

export default function Shell() {
  return <SortPage algorithmName="Shell Sort" sortFunction={shellSort} />;
}