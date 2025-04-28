import SortPage from "../components/SortPage";
import { introSort } from "../Api";

export default function Intro() {
  return <SortPage algorithmName="Intro Sort" sortFunction={introSort} />;
}