import SortPage from "../components/SortPage";
import { selectionSort } from "../Api";

export default function Bubble() {
  return <SortPage algorithmName="Selection Sort" sortFunction={selectionSort} />;
}