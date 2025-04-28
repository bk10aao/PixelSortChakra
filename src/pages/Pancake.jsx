import SortPage from "../components/SortPage";
import { pancakeSort } from "../Api";

export default function Pancake() {
  return <SortPage algorithmName="Pancake Sort" sortFunction={pancakeSort} />;
}