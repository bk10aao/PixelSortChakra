import { useState, useRef } from "react";
import { Alert, AlertIcon, Box, SimpleGrid, Heading, VStack, Button } from "@chakra-ui/react";
import NumberGeneratorForm from "../components/NumberGeneratorForm";
import AlgorithmComparison from "../components/AlgorithmComparison";
import { generateNumbers, radixSortLSD, radixSortMSD } from "../Api";

export default function RadixSortComparisonPage() {
  const [state, setState] = useState({
    value: 50,
    numbers: [],
    radixSortLSDSteps: [],
    radixSortMSDSteps: [],
    radixSortLSDSorted: false,
    radixSortMSDSorted: false,
    error: null,
    showTiles: false,
    loading: { generate: false, radixSortLSD: false, radixSortMSD: false },
  });

  const graphRef = useRef(null);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = async (e, value) => {
    updateState({
      error: null,
      numbers: [],
      radixSortLSDSteps: [],
      radixSortMSDSteps: [],
      radixSortLSDSorted: false,
      radixSortMSDSorted: false,
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
        radixSortLSDSteps: [numbers],
        radixSortMSDSteps: [numbers],
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

  const handleRadixSortLSD = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, radixSortLSD: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await radixSortLSD(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        radixSortLSDSteps: steps,
        radixSortLSDSorted: steps.length > 0,
        loading: { ...state.loading, radixLSDSort: false },
      });
    } catch (err) {
      console.error("Error sorting Radix Sort Least Significant Digit:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, radixLSDSort: false },
      });
    }
  };

  const handleRadixSortMSD = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, radixSortMSD: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await radixSortMSD(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        radixSortMSDSteps: steps,
        radixSortMSDSorted: steps.length > 0,
        loading: { ...state.loading, radixSortMSD: false },
      });
    } catch (err) {
      console.error("Error sorting Radix Sort Most Significant DIgit:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, radixSortMSD: false },
      });
    }
  };

  const handleSortBoth = async () => {
    await Promise.all([handleRadixSortLSD(), handleRadixSortMSD()]);
  };

  return (
    <Box p={4} pt={{ base: "40px", md: "30px" }} mx="auto" maxW="1440px">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Radix Sort Least Significant Digit vs Radix Sort Most Significant Digit
      </Heading>
      <VStack spacing={4} mb={8} w="100%" align="stretch">
        <NumberGeneratorForm
          value={state.value}
          loading={state.loading.generate}
          onValueChange={(val) => updateState({ value: val })}
          onSubmit={handleGenerate}
          width="100%"
        />
        {state.error && (
          <Alert status="error" w="100%" maxW="1440px">
            <AlertIcon />
            {state.error}
          </Alert>
        )}
      </VStack>
      {state.showTiles && (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} ref={graphRef}>
            <Box>
              <AlgorithmComparison
                algorithm="Radix Sort Least Significant Digit"
                steps={state.radixSortLSDSteps}
                isSorted={state.radixSortLSDSorted}
                loading={state.loading.radixSortLSD}
                isSortingAll={false}
                hasSortedAll={false}
                height={400}
              />
            </Box>
            <Box>
              <AlgorithmComparison
                algorithm="Radix Sort Most Significant Digit"
                steps={state.radixSortMSDSteps}
                isSorted={state.radixSortMSDSorted}
                loading={state.loading.radixSortMSD}
                isSortingAll={false}
                hasSortedAll={false}
                height={400}
              />
            </Box>
          </SimpleGrid>
          <Box mt={4}>
            <Button
              onClick={handleSortBoth}
              isLoading={state.loading.radixSortLSD || state.loading.radixSortMSD}
              isDisabled={state.loading.radixSortLSD || state.loading.radixSortMSD}
              colorScheme="blue"
              width="100%"
            >
              Sort
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}