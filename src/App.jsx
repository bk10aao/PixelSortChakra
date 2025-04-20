import { BrowserRouter, Routes, Route } from "react-router-dom";
import Algorithms from "./pages/Algorithms";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/algorithms" element={<Algorithms />} />
				<Route path="/" element={<Algorithms />}  />
			</Routes>
		</BrowserRouter>
	);
}