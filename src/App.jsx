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

// Define the custom dark theme
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
  styles: {
    global: {
      body: {
        bg: "gray.800",
        color: "gray.100", // Brighter text for better contrast
      },
      h1: {
        color: "white",
        fontWeight: "bold",
      },
      h3: {
        color: "white",
        fontWeight: "semibold",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "teal.500",
          color: "white",
          _hover: {
            bg: "teal.600",
            transform: "scale(1.02)",
            transition: "all 0.2s",
          },
          _loading: {
            opacity: 0.8,
            _spinner: {
              color: "white",
            },
          },
        },
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          color: "gray.300",
          fontWeight: "semibold",
          _selected: {
            color: "white",
            borderColor: "teal.500",
            borderBottomWidth: "3px",
          },
          _hover: {
            color: "gray.100",
          },
        },
        tablist: {
          borderBottomColor: "gray.600",
          bg: "gray.700",
          py: 2,
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: "white",
        fontWeight: "semibold",
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: "gray.600",
          color: "gray.100",
          borderColor: "gray.500",
          _hover: {
            borderColor: "gray.400",
          },
          _focus: {
            borderColor: "teal.500",
            boxShadow: "0 0 0 1px teal.500",
          },
        },
      },
    },
  },
});

export default function App() {
  return (
    <ChakraProvider theme={darkTheme}>
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