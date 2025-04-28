import SortPage from "../components/SortPage";
import { radixSort } from "../Api";

export default function Radix() {
  return <SortPage algorithmName="Radix Sort" sortFunction={radixSort} />;
}