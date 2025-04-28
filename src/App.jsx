import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Algorithms from "./pages/Algorithms";
import Bubble from "./pages/Bubble";
import Heap from "./pages/Heap";
import Radix from "./pages/Radix";
import Insertion from "./pages/Insertion";
import Merge from "./pages/Merge";
import Quick from "./pages/Quick";
import Selection from "./pages/Selection";
import Shell from "./pages/Shell";
import Pancake from "./pages/Pancake";
import Tim from "./pages/Tim";
import IntroSort from "./pages/Intro";
import theme from "./theme";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Algorithms />} />
            <Route path="/bubble" element={<Bubble />} />
            <Route path="/heap" element={<Heap />} />
            <Route path="/radix" element={<Radix />} />
            <Route path="/insertion" element={<Insertion />} />
            <Route path="/merge" element={<Merge />} />
            {/* <Route path="/merge-two" element={<MergeTwo />} /> */}
            <Route path="/quick" element={<Quick />} />
            <Route path="/selection" element={<Selection />} />
            <Route path="/shell" element={<Shell />} />
            <Route path="/pancake" element={<Pancake />} />
            <Route path="/tim" element={<Tim />} />
            <Route path="/intro-sort" element={<IntroSort />} />
            <Route path="/intro" element={<Algorithms />} /> {/* Adjust if Intro has a dedicated page */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}