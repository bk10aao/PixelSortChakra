import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
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
import Shell from "./pages/Shell";
import './app.css';
import Bucket from "./pages/Bucket";
import React from "react";
const darkTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
    teal: {
      500: "#38B2AC",
      600: "#319795",
    },
    red: {
      500: "#E53E3E",
    },
  },
});

export default function App() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      document.body.style.paddingTop = `${navbarHeight + 10}px`;
    }
  }, []); 

  return (
    <ChakraProvider theme={darkTheme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Algorithms />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/bubble" element={<Bubble />} />
          <Route path="/bucket" element={<Bucket />} />
          <Route path="/heap" element={<Heap />} />
          <Route path="/radix" element={<Radix />} />
          <Route path="/insertion" element={<Insertion />} />
          <Route path="/merge" element={<Merge />} />
          <Route path="/quick" element={<Quick />} />
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