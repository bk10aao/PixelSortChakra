import SortPage from "../components/SortPage";
import { bucketSort } from "../Api";

export default function Bucket() {
  return <SortPage algorithmName="Bucket Sort" sortFunction={bucketSort} />;
}