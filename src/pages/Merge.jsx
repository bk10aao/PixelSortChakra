import { useState, useRef } from "react";
import { Alert, AlertIcon, Box, SimpleGrid, Heading, VStack, Button } from "@chakra-ui/react";
import NumberGeneratorForm from "../components/NumberGeneratorForm";
import AlgorithmComparison from "../components/AlgorithmComparison";
import { generateNumbers, mergeSort, mergeSortTwo } from "../Api";

export default function MergeSortComparisonPage() {
  const [state, setState] = useState({
    value: 50,
    numbers: [],
    mergeSortSteps: [],
    mergeSortTwoSteps: [],
    mergeSortSorted: false,
    mergeSortTwoSorted: false,
    error: null,
    showTiles: false,
    loading: { generate: false, mergeSort: false, mergeSortTwo: false },
  });

  const graphRef = useRef(null);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = async (e, value) => {
    updateState({
      error: null,
      numbers: [],
      mergeSortSteps: [],
      mergeSortTwoSteps: [],
      mergeSortSorted: false,
      mergeSortTwoSorted: false,
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
        mergeSortSteps: [numbers],
        mergeSortTwoSteps: [numbers],
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

  const handleMergeSort = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, mergeSort: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await mergeSort(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        mergeSortSteps: steps,
        mergeSortSorted: steps.length > 0,
        loading: { ...state.loading, mergeSort: false },
      });
    } catch (err) {
      console.error("Error sorting Merge Sort:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, mergeSort: false },
      });
    }
  };

  const handleMergeSortTwo = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, mergeSortTwo: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await mergeSortTwo(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        mergeSortTwoSteps: steps,
        mergeSortTwoSorted: steps.length > 0,
        loading: { ...state.loading, mergeSortTwo: false },
      });
    } catch (err) {
      console.error("Error sorting Merge Sort Two:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, mergeSortTwo: false },
      });
    }
  };

  const handleSortBoth = async () => {
    await Promise.all([handleMergeSort(), handleMergeSortTwo()]);
  };

  return (
    <Box p={4} pt={{ base: "40px", md: "30px" }} mx="auto" maxW="1440px">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Merge Sort vs Merge Sort Two
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
                algorithm="Merge Sort"
                steps={state.mergeSortSteps}
                isSorted={state.mergeSortSorted}
                loading={state.loading.mergeSort}
                isSortingAll={false}
                hasSortedAll={false}
                height={400}
              />
            </Box>
            <Box>
              <AlgorithmComparison
                algorithm="Merge Sort Two"
                steps={state.mergeSortTwoSteps}
                isSorted={state.mergeSortTwoSorted}
                loading={state.loading.mergeSortTwo}
                isSortingAll={false}
                hasSortedAll={false}
                height={400}
              />
            </Box>
          </SimpleGrid>
          <Box mt={4}>
            <Button
              onClick={handleSortBoth}
              isLoading={state.loading.mergeSort || state.loading.mergeSortTwo}
              isDisabled={state.loading.mergeSort || state.loading.mergeSortTwo}
              colorScheme="blue"
              width="100%"
            >
              Sort Both
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}