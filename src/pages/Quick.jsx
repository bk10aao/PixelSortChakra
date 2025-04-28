import SortPage from "../components/SortPage";
import { quickSort } from "../Api";

export default function Quick() {
  return <SortPage algorithmName="Quick Sort" sortFunction={quickSort} />;
}