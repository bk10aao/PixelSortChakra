import { useState, useRef, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import {
  generateNumbers,
  quickSort,
  selectionSort,
  bubbleSort,
  mergeSort,
  mergeSortTwo,
  shellSort,
  insertionSort,
  heapSort,
  radixSort,
} from "../Api";
import NumberGeneratorForm from "../components/NumberGeneratorForm";
import AlgorithmTile from "../components/AlgorithmTile";

export default function Algorithms() {
  const [state, setState] = useState({
    value: 50,
    numbers: [],
    quickSortSteps: [],
    selectionSortSteps: [],
    bubbleSortSteps: [],
    mergeSortSteps: [],
    mergeSortTwoSteps: [],
    insertionSortSteps: [],
    heapSortSteps: [],
    radixSortSteps: [],
    quickSortSorted: false,
    selectionSortSorted: false,
    bubbleSortSorted: false,
    mergeSortSorted: false,
    mergeSortTwoSorted: false,
    insertionSortSorted: false,
    heapSortSorted: false,
    radixSortSorted: false,
    error: null,
    showTiles: false,
    isSortingAll: false,
    hasSortedAll: false, 
    loading: {
      generate: false,
      quickSort: false,
      selectionSort: false,
      bubbleSort: false,
      mergeSort: false,
      mergeSortTwo: false,
      insertionSort: false,
      heapSort: false,
      radixSort: false,
    },
  });

  const graphRef = useRef(null);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    if (state.showTiles && state.numbers.length > 0 && graphRef.current) {
      graphRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.showTiles, state.numbers]);

  const handleSubmit = async (e, value) => {
    updateState({
      error: null,
      numbers: [],
      quickSortSteps: [],
      selectionSortSteps: [],
      bubbleSortSteps: [],
      mergeSortSteps: [],
      mergeSortTwoSteps: [],
      insertionSortSteps: [],
      heapSortSteps: [],
      shellSortSteps: [],
      radixSortSteps: [],
      quickSortSorted: false,
      selectionSortSorted: false,
      bubbleSortSorted: false,
      mergeSortSorted: false,
      mergeSortTwoSorted: false,
      shellSortSorted: false,
      insertionSortSorted: false,
      heapSortSorted: false,
      radixSortSorted: false,
      showTiles: false,
      hasSortedAll: false, 
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
        quickSortSteps: [numbers],
        selectionSortSteps: [numbers],
        bubbleSortSteps: [numbers],
        mergeSortSteps: [numbers],
        mergeSortTwoSteps: [numbers],
        insertionSortSteps: [numbers],
        shellSortSteps: [numbers],
        heapSortSteps: [numbers],
        radixSortSteps: [numbers],
        quickSortSorted: false,
        selectionSortSorted: false,
        bubbleSortSorted: false,
        mergeSortSorted: false,
        mergeSortTwoSorted: false,
        insertionSortSorted: false,
        shellSortSorted: false,
        heapSortSorted: false,
        radixSortSorted: false,
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

  const handleSortSingle = async (algorithm) => {
    const algorithmMap = {
      "Quick Sort": { name: "quickSort", fn: quickSort },
      "Selection Sort": { name: "selectionSort", fn: selectionSort },
      "Bubble Sort": { name: "bubbleSort", fn: bubbleSort },
      "Merge Sort": { name: "mergeSort", fn: mergeSort },
      "Merge Sort Two": { name: "mergeSortTwo", fn: mergeSortTwo },
      "Insertion Sort": { name: "insertionSort", fn: insertionSort },
      "Shell Sort": { name: "shellSort", fn: shellSort },
      "Heap Sort": { name: "heapSort", fn: heapSort },
      "Radix Sort": { name: "radixSort", fn: radixSort },
    };

    const { name, fn } = algorithmMap[algorithm] || {};
    if (!name || !fn) {
      updateState({ error: `Unknown algorithm: ${algorithm}` });
      return;
    }

    updateState({
      error: null,
      loading: { ...state.loading, [name]: true },
    });

    const payload = { values: state.numbers };

    try {
      const data = await fn(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      updateState({
        [`${name}Steps`]: steps,
        [`${name}Sorted`]: steps.length > 0,
        loading: { ...state.loading, [name]: false },
      });
    } catch (err) {
      console.error(`Error sorting ${name}:`, err);
      updateState({
        error: err.message,
        loading: { ...state.loading, [name]: false },
      });
    }
  };

  const handleSortAll = async () => {
    updateState({
      error: null,
      isSortingAll: true,
      hasSortedAll: true,
      loading: {
        ...state.loading,
        quickSort: true,
        selectionSort: true,
        bubbleSort: true,
        mergeSort: true,
        mergeSortTwo: true,
        shellSort: true,
        insertionSort: true,
        heapSort: true,
        radixSort: true,
      },
    });

    const payload = { values: state.numbers };

    const algorithms = [
      { name: "quickSort", fn: quickSort },
      { name: "selectionSort", fn: selectionSort },
      { name: "bubbleSort", fn: bubbleSort },
      { name: "mergeSort", fn: mergeSort },
      { name: "mergeSortTwo", fn: mergeSortTwo },
      { name: "shellSort", fn: shellSort },
      { name: "insertionSort", fn: insertionSort },
      { name: "heapSort", fn: heapSort },
      { name: "radixSort", fn: radixSort },
    ];

    try {
      const results = await Promise.all(
        algorithms.map(async ({ name, fn }) => {
          try {
            const data = await fn(payload);
            const steps = data.results && Array.isArray(data.results) ? data.results : [];
            return { name, steps };
          } catch (err) {
            console.error(`Error sorting ${name}:`, err);
            return { name, error: err.message };
          }
        })
      );

      results.forEach(({ name, steps, error }) => {
        updateState({
          [`${name}Steps`]: steps || [],
          [`${name}Sorted`]: steps.length > 0,
          error: error || state.error,
          loading: { ...state.loading, [name]: false },
        });
      });

      const lastSteps = results[results.length - 1].steps;

      updateState({
        numbers: lastSteps.length > 0 ? lastSteps[lastSteps.length - 1] : state.numbers,
        isSortingAll: false,
      });
    } catch (err) {
      updateState({
        error: err.message,
        isSortingAll: false,
        loading: {
          ...state.loading,
          quickSort: false,
          selectionSort: false,
          bubbleSort: false,
          mergeSort: false,
          mergeSortTwo: false,
          shellSort: false,
          insertionSort: false,
          heapSort: false,
          radixSort: false,
        },
      });
    }
  };

  return (
    <Box maxWidth="1440px" p={4}>
      <NumberGeneratorForm
        value={state.value}
        loading={state.loading.generate}
        onValueChange={(val) => updateState({ value: val })}
        onSubmit={handleSubmit}
      />
      {state.error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {state.error}
        </Alert>
      )}
      {state.numbers.length > 0 && (
        <VStack spacing={6} mt={6} align="stretch">
          {state.showTiles && (
            <SimpleGrid
              ref={graphRef}
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={6}
            >
              <AlgorithmTile
                algorithm="Bubble Sort"
                steps={state.bubbleSortSteps}
                isSorted={state.bubbleSortSorted}
                onSort={handleSortSingle}
                loading={state.loading.bubbleSort}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
              <AlgorithmTile
                algorithm="Insertion Sort"
                steps={state.insertionSortSteps}
                isSorted={state.insertionSortSorted}
                onSort={handleSortSingle}
                loading={state.loading.insertionSort}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
              <AlgorithmTile
                algorithm="Heap Sort"
                steps={state.heapSortSteps}
                isSorted={state.heapSortSorted}
                onSort={handleSortSingle}
                loading={state.loading.heapSort}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
              <AlgorithmTile
                algorithm="Radix Sort"
                steps={state.radixSortSteps}
                isSorted={state.radixSortSorted}
                onSort={handleSortSingle}
                loading={state.loading.radixSort}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
              <AlgorithmTile
                algorithm="Merge Sort"
                steps={state.mergeSortSteps}
                isSorted={state.mergeSortSorted}
                onSort={handleSortSingle}
                loading={state.loading.mergeSort}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
              <AlgorithmTile
                algorithm="Merge Sort Two"
                steps={state.mergeSortTwoSteps}
                isSorted={state.mergeSortTwoSorted}
                onSort={handleSortSingle}
                loading={state.loading.mergeSortTwo}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
              <AlgorithmTile
                algorithm="Quick Sort"
                steps={state.quickSortSteps}
                isSorted={state.quickSortSorted}
                onSort={handleSortSingle}
                loading={state.loading.quickSort}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
              <AlgorithmTile
                algorithm="Shell Sort"
                steps={state.shellSortSteps}
                isSorted={state.shellSortSorted}
                onSort={handleSortSingle}
                loading={state.loading.shellSort}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
              <AlgorithmTile
                algorithm="Selection Sort"
                steps={state.selectionSortSteps}
                isSorted={state.selectionSortSorted}
                onSort={handleSortSingle}
                loading={state.loading.selectionSort}
                isSortingAll={state.isSortingAll}
                hasSortedAll={state.hasSortedAll}
              />
            </SimpleGrid>
          )}
          <Button colorScheme="teal" onClick={handleSortAll} align="center">
            Sort
          </Button>
        </VStack>
      )}
    </Box>
  );
}