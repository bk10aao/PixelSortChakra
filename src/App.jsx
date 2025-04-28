import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import NavBar from "./components/NavBar";
import Algorithms from "./pages/Algorithms";
import Pancake from "./pages/Pancake";
import Intro from "./pages/Intro";
import Tim from "./pages/Tim";
import Radix from "./pages/Radix";
import Bubble from "./pages/Bubble";
import Heap from "./pages/Heap";
import Insertion from "./pages/Insertion";
import Merge from "./pages/Merge";
import Quick from "./pages/Quick";
import Selection from "./pages/Selection";
import Shell from "./pages/Shell"

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Algorithms />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/bubble" element={<Bubble />} />
          <Route path="/heap" element={<Heap />} />
          <Route path="/radix" element={<Radix/>} />
          <Route path="/insertion" element={<Insertion />} />
          <Route path="/merge" element={<Merge />} />
          <Route path="/quick" element={<Quick/>} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/shell" element={<Shell />} />
          <Route path="/pancake" element={<Pancake />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/tim" element={<Tim />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}