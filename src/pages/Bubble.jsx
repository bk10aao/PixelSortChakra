import SortPage from "../components/SortPage";
import { bubbleSort } from "../Api";

export default function Bubble() {
  return <SortPage algorithmName="Bubble Sort" sortFunction={bubbleSort} />;
}