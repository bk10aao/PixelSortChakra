import { useState, useRef } from "react";
import { Alert, AlertIcon, Box, SimpleGrid, VStack, Button, Heading } from "@chakra-ui/react";
import NumberGeneratorForm from "../components/NumberGeneratorForm";
import AlgorithmComparison from "../components/AlgorithmComparison";
import { generateNumbers, inplaceMergeSort, mergeSortBottomUp, mergeSortTopDown, timSort, parallelMergeSort } from "../Api";

export default function MergeSortComparisonPage() {
  const [state, setState] = useState({
    value: 50,
    numbers: [],
    mergeSortBottomUpSteps: [],
    mergeSortTopDownSteps: [],
    inplaceMergeSortSteps: [],
    parallelMergeSortSteps: [],
    timSortSteps: [],
    mergeSortBottomUpSorted: false,
    mergeSortTopDownSorted: false,
    inplaceMergeSortSorted: false,
    timSortSorted: false,
    parallelMergeSortSorted: false,
    error: null,
    showTiles: false,
    loading: { generate: false, mergeSortBottomUp: false, mergeSortTopDown: false },
  });

  const graphRef = useRef(null);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = async (e, value) => {
    updateState({
      error: null,
      numbers: [],
      mergeSortBottomUpSteps: [],
      mergeSortTopDownSteps: [],
      inplaceMergeSortSteps: [],
      parallelMergeSortSteps: [],
      timeSortSteps: [],
      mergeSortBottomUpSorted: false,
      mergeSortTopDownSorted: false,
      inplaceMergeSortSorted: false,
      parallelMergeSortSorted: false,
      timSortSorted: false,
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
        mergeSortBottomUpSteps: [numbers],
        mergeSortTopDownSteps: [numbers],
        inplaceMergeSortSteps: [numbers],
        timSortSteps: [numbers],
        parallelMergeSortSteps: [numbers],
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
      loading: { ...state.loading, mergeSortBottomUp: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await mergeSortBottomUp(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        mergeSortBottomUpSteps: steps,
        mergeSortBottomUpSorted: steps.length > 0,
        loading: { ...state.loading, mergeSortBottomUp: false },
      });
    } catch (err) {
      console.error("Error sorting Merge Sort:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, mergeSortBottomUp: false },
      });
    }
  };

  const handlemergeSortTopDown = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, mergeSortTopDown: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await mergeSortTopDown(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        mergeSortTopDownSteps: steps,
        mergeSortTopDownSorted: steps.length > 0,
        loading: { ...state.loading, mergeSortTopDown: false },
      });
    } catch (err) {
      console.error("Error sorting Merge Sort Two:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, mergeSortTopDown: false },
      });
    }
  };

  const handleInplaceMergeSort = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, inplaceMergeSort: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await inplaceMergeSort(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        inplaceMergeSortSteps: steps,
        inplaceMergeSortSorted: steps.length > 0,
        loading: { ...state.loading, inplaceMergeSort: false },
      });
    } catch (err) {
      console.error("Error sorting Merge Sort Two:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, inplaceMergeSort: false },
      });
    }
  };

  const handleTimSort = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, timSort: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await timSort(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        timSortSteps: steps,
        timSortSorted: steps.length > 0,
        loading: { ...state.loading, timSort: false },
      });
    } catch (err) {
      console.error("Error sorting Merge Sort Two:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, timSortSorted: false },
      });
    }
  };

  const handleParallelMergeSort = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, parallelMergeSort: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await parallelMergeSort(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        parallelMergeSortSteps: steps,
        parallelMergeSortSorted: steps.length > 0,
        loading: { ...state.loading, mergeSortBottomUp: false },
      });
    } catch (err) {
      console.error("Error sorting Merge Sort:", err);
      updateState({
        error: err.message,
        loading: { ...state.loading, parallelMergeSort: false },
      });
    }
  };

  const handleSortBoth = async () => {
    await Promise.all([handleMergeSort(), handlemergeSortTopDown(), handleInplaceMergeSort(), handleTimSort(), handleParallelMergeSort()]);
  };

  return (
    <Box p={4} pt={{ base: "40px", md: "30px" }} mx="auto" maxW="1440px">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Comparing Merge Sort Algorithms
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
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} ref={graphRef}>
            <Box>
              <AlgorithmComparison
                algorithm="Bottom Up"
                steps={state.mergeSortBottomUpSteps}
                isSorted={state.mergeSortBottomUpSorted}
                loading={state.loading.mergeSortBottomUp}
                isSortingAll={false}
                hasSortedAll={false}
                height={150}
              />
            </Box>
            <Box>
              <AlgorithmComparison
                algorithm="Bottom Down"
                steps={state.mergeSortTopDownSteps}
                isSorted={state.mergeSortTopDownSorted}
                loading={state.loading.mergeSortTopDown}
                isSortingAll={false}
                hasSortedAll={false}
                height={150}
              />
            </Box>
            <Box>
              <AlgorithmComparison
                algorithm="Inplace"
                steps={state.inplaceMergeSortSteps}
                isSorted={state.inplaceMergeSortSorted}
                loading={state.loading.inplaceMergeSort}
                isSortingAll={false}
                hasSortedAll={false}
                height={150}
              />
            </Box>
            <Box>
              <AlgorithmComparison
                algorithm="Parallel"
                steps={state.parallelMergeSortSteps}
                isSorted={state.parallelMergeSortSorted}
                loading={state.loading.parallelMergeSort}
                isSortingAll={false}
                hasSortedAll={false}
                height={150}
              />
            </Box>
          </SimpleGrid>
          <Box mt={4}>
            <Button
              onClick={handleSortBoth}
              isLoading={state.loading.mergeSortBottomUp || state.loading.mergeSortTopDown || state.loading.inplaceMergeSort || state.loading.timSort || state.loading.parallelMergeSort}
              isDisabled={state.loading.mergeSortBottomUp || state.loading.mergeSortTopDown || state.loading.inplaceMergeSort || state.loading.timSort || state.loading.parallelMergeSort}
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