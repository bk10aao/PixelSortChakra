import { useState, useRef } from "react";
import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import NumberGeneratorForm from "../components/NumberGeneratorForm";
import AlgorithmTile from "../components/AlgorithmTile";
import { generateNumbers } from "../Api";

export default function SortPage({ algorithmName, sortFunction }) {
  const [state, setState] = useState({
    value: 50,
    numbers: [],
    sortSteps: [],
    isSorted: false,
    error: null,
    showTiles: false,
    loading: { generate: false, sort: false },
  });

  const graphRef = useRef(null);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e, value) => {
    updateState({
      error: null,
      numbers: [],
      sortSteps: [],
      isSorted: false,
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
        sortSteps: [numbers],
        isSorted: false,
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
      loading: { ...state.loading, sort: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await sortFunction(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        sortSteps: steps,
        isSorted: steps.length > 0,
        loading: { ...state.loading, sort: false },
      });
    } catch (err) {
      console.error(`Error sorting ${algorithmName}:`, err);
      updateState({
        error: err.message,
        loading: { ...state.loading, sort: false },
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
          {state.showTiles && (
            <Box
              ref={graphRef}
              w="100vw"
              h="100vh"
              paddingTop={5}
              paddingLeft={5}
              paddingRight={5}
            >
              <AlgorithmTile
                algorithm={algorithmName}
                steps={state.sortSteps}
                isSorted={state.isSorted}
                onSort={handleSort}
                loading={state.loading.sort}
                isSortingAll={false}
                hasSortedAll={false}
                height={400}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}