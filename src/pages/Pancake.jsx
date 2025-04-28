import { useState, useRef, useEffect } from "react";
import { Alert, AlertIcon, Box, VStack } from "@chakra-ui/react";
import { generateNumbers, pancakeSort } from "../Api";
import NumberGeneratorForm from "../components/NumberGeneratorForm";
import AlgorithmTile from "../components/AlgorithmTile";

export default function Pancake() {
  const [state, setState] = useState({
    value: 50,
    numbers: [],
    pancakeSortSteps: [],
    pancakeSortSorted: false,
    error: null,
    showTiles: false,
    loading: { generate: false, pancakeSort: false },
  });

  const graphRef = useRef(null);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  // Scroll to tile when it appears
  useEffect(() => {
    if (state.showTiles && state.numbers.length > 0 && graphRef.current) {
      graphRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.showTiles, state.numbers]);

  const handleSubmit = async (e, value) => {
    updateState({
      error: null,
      numbers: [],
      pancakeSortSteps: [],
      pancakeSortSorted: false,
      showTiles: false,
      loading: { ...state.loading, generate: true },
    });

    const payload = {
      value: parseInt(value),
      maxRange: parseInt(value),
    };

    try {
      const data = await generateNumbers(payload);
      const numbers = data.results || [];
      updateState({
        numbers,
        pancakeSortSteps: [numbers],
        pancakeSortSorted: false,
        showTiles: true,
        loading: { ...state.loading, generate: false },
      });
    } catch (err) {
      updateState({
        error: err.message,
        loading: { ...state.loading, generate: false },
      });
    }
  };

  const handleSort = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, pancakeSort: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await pancakeSort(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        pancakeSortSteps: steps,
        pancakeSortSorted: steps.length > 0,
        loading: { ...state.loading, pancakeSort: false },
      });
    } catch (err) {
      console.error("Error sorting Pancake Sort:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, pancakeSort: false },
      });
    }
  };

  return (
    <Box p={4} pt={{ base: "80px", md: "60px" }} mx="auto">
      <NumberGeneratorForm
        value={state.value}
        loading={state.loading.generate}
        onValueChange={(val) => updateState({ value: val })}
        onSubmit={handleSubmit}
      />
      {state.numbers.length > 0 && (
        <>
          {state.error && (
            <Alert status="error" mt={4} maxW="1440px" mx="auto">
              <AlertIcon />
              {state.error}
            </Alert>
          )}
          <VStack
            spacing={6}
            mt={6}
            align="stretch"
            maxW="100vw"
            w="100vw"
            mx="auto"
          >
            {state.showTiles && (
              <Box
                ref={graphRef}
                w="100vw"
                mx="auto"
                overflow="hidden"
              >
                <AlgorithmTile
                  algorithm="Pancake Sort"
                  steps={state.pancakeSortSteps}
                  isSorted={state.pancakeSortSorted}
                  onSort={handleSort}
                  loading={state.loading.pancakeSort}
                  isSortingAll={false}
                  hasSortedAll={false}
                />
              </Box>
            )}
          </VStack>
        </>
      )}
    </Box>
  );
}