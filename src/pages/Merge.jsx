import SortPage from "../components/SortPage";
import { mergeSort } from "../Api";

export default function Merge() {
  return <SortPage algorithmName="Merge Sort" sortFunction={mergeSort} />;
}