import { useState, useRef, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  SimpleGrid,
  VStack,
  Heading,
} from "@chakra-ui/react";
import {
  generateNumbers,
  quickSort,
  selectionSort,
  bubbleSort,
  mergeSortBottomUp,
  mergeSortTopDown,
  shellSort,
  insertionSort,
  heapSort,
  radixSortLSD,
  radixSortMSD,
  pancakeSort,
  timSort,
  introSort,
  inplaceMergeSort,
  parallelMergeSort,
  bucketSort,
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
    mergeSortBottomUpSteps: [],
    mergeSortTopDownSteps: [],
    insertionSortSteps: [],
    heapSortSteps: [],
    radixSortLSDSteps: [],
    radixSortMSDSteps: [],
    pancakeSortSteps: [],
    timSortSteps: [],
    introSortSteps: [],
    inplaceMergeSortSteps: [],
    parallelMergeSortSteps: [],
    bucketSortSteps: [],
    quickSortSorted: false,
    selectionSortSorted: false,
    bubbleSortSorted: false,
    mergeSortBottomUpSorted: false,
    mergeSortTopDownSorted: false,
    insertionSortSorted: false,
    heapSortSorted: false,
    radixSortLSDSorted: false,
    radixSortMSDSorted: false,
    pancakeSortSorted: false,
    timSortSorted: false,
    introSortSorted: false,
    inplaceMergeSortSorted: false,
    parallelMergeSortSorted: false,
    bucketSortSorted: false,
    quickSortTotalSteps: undefined,
    selectionSortTotalSteps: undefined,
    bubbleSortTotalSteps: undefined,
    mergeSortBottomUpTotalSteps: undefined,
    mergeSortTopDownTotalSteps: undefined,
    insertionSortTotalSteps: undefined,
    heapSortTotalSteps: undefined,
    radixSortLSDTotalSteps: undefined,
    radixSortMSDTotalSteps: undefined,
    pancakeSortTotalSteps: undefined,
    timSortTotalSteps: undefined,
    introSortTotalSteps: undefined,
    inplaceMergeSortTotalSteps: undefined,
    parallelMergeSortTotalSteps: undefined,
    bucketSortTotalSteps: undefined,
    error: null,
    showTiles: false,
    isSortingAll: false,
    hasSortedAll: false,
    loading: {
      generate: false,
      quickSort: false,
      selectionSort: false,
      bubbleSort: false,
      mergeSortBottomUp: false,
      mergeSortTopDown: false,
      insertionSort: false,
      heapSort: false,
      radixSortLSD: false,
      radixSortMSD: false,
      pancakeSort: false,
      timSort: false,
      introSort: false,
      inplaceMergeSort: false,
      parallelMergeSort: false,
      bucketSort: false,
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
      mergeSortBottomUpSteps: [],
      mergeSortTopDownSteps: [],
      insertionSortSteps: [],
      heapSortSteps: [],
      shellSortSteps: [],
      radixSortLSDSteps: [],
      radixSortMSDSteps: [],
      pancakeSortSteps: [],
      timSortSteps: [],
      introSortSteps: [],
      inplaceMergeSortSteps: [],
      parallelMergeSortSteps: [],
      bucketSortSteps: [],
      quickSortSorted: false,
      selectionSortSorted: false,
      bubbleSortSorted: false,
      mergeSortBottomUpSorted: false,
      mergeSortTopDownSorted: false,
      shellSortSorted: false,
      insertionSortSorted: false,
      heapSortSorted: false,
      radixSortLSDSorted: false,
      radixSortMSDSorted: false,
      pancakeSortSorted: false,
      timSortSorted: false,
      introSortSorted: false,
      bucketSortSorted: false,
      inplaceMergeSortSorted: false,
      parallelMergeSortSorted: false,
      quickSortTotalSteps: undefined,
      selectionSortTotalSteps: undefined,
      bubbleSortTotalSteps: undefined,
      mergeSortBottomUpTotalSteps: undefined,
      mergeSortTopDownTotalSteps: undefined,
      insertionSortTotalSteps: undefined,
      heapSortTotalSteps: undefined,
      radixSortLSDTotalSteps: undefined,
      radixSortMSDTotalSteps: undefined,
      pancakeSortTotalSteps: undefined,
      timSortTotalSteps: undefined,
      introSortTotalSteps: undefined,
      inplaceMergeSortTotalSteps: undefined,
      parallelMergeSortTotalSteps: undefined,
      bucketSortTotalSteps: undefined,
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
        mergeSortBottomUpSteps: [numbers],
        mergeSortTopDownSteps: [numbers],
        insertionSortSteps: [numbers],
        shellSortSteps: [numbers],
        heapSortSteps: [numbers],
        radixSortLSDSteps: [numbers],
        radixSortMSDSteps: [numbers],
        pancakeSortSteps: [numbers],
        timSortSteps: [numbers],
        introSortSteps: [numbers],
        inplaceMergeSortSteps: [numbers],
        parallelMergeSortSteps: [numbers],
        bucketSortSteps: [numbers],
        quickSortSorted: false,
        selectionSortSorted: false,
        bubbleSortSorted: false,
        mergeSortBottomUpSorted: false,
        mergeSortTopDownSorted: false,
        insertionSortSorted: false,
        shellSortSorted: false,
        heapSortSorted: false,
        radixSortLSDSorted: false,
        radixSortMSDSorted: false,
        pancakeSortSorted: false,
        timSortSorted: false,
        introSortSorted: false,
        inplaceMergeSortSorted: false,
        parallelMergeSortSorted: false,
        bucketSortSorted: false,
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
      "Merge Sort Bottom Up": { name: "mergeSortBottomUp", fn: mergeSortBottomUp },
      "Merge Sort Top Down": { name: "mergeSortTopDown", fn: mergeSortTopDown },
      "Insertion Sort": { name: "insertionSort", fn: insertionSort },
      "Shell Sort": { name: "shellSort", fn: shellSort },
      "Heap Sort": { name: "heapSort", fn: heapSort },
      "Radix Sort LSD": { name: "radixSortLSD", fn: radixSortLSD },
      "Radix Sort MSD": { name: "radixSortMSD", fn: radixSortMSD },
      "Pancake Sort": { name: "pancakeSort", fn: pancakeSort },
      "Tim Sort": { name: "timSort", fn: timSort },
      "Intro Sort": { name: "introSort", fn: introSort },
      "Inplace Merge Sort": { name: "inplaceMergeSort", fn: inplaceMergeSort },
      "Parallel Merge Sort": { name: "parallelMergeSort", fn: parallelMergeSort },
      "Bucket Sort": { name: "bucketSort", fn: bucketSort },
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
      const finalStep = steps[steps.length - 1] || [];
      const isSorted = steps.length > 0 && finalStep.every((val, i) => i === 0 || val >= finalStep[i - 1]);
      updateState({
        [`${name}Steps`]: steps,
        [`${name}Sorted`]: isSorted,
        [`${name}TotalSteps`]: steps.length,
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
        mergeSortBottomUp: true,
        mergeSortTopDown: true,
        shellSort: true,
        insertionSort: true,
        heapSort: true,
        radixSortLSD: true,
        radixSortMSD: true,
        pancakeSort: true,
        timSort: true,
        introSort: true,
        inplaceMergeSort: true,
        parallelMergeSort: true,
        bucketSort: true,
      },
    });

    const payload = { values: state.numbers };

    const algorithms = [
      { name: "quickSort", fn: quickSort },
      { name: "selectionSort", fn: selectionSort },
      { name: "bubbleSort", fn: bubbleSort },
      { name: "mergeSortBottomUp", fn: mergeSortBottomUp },
      { name: "mergeSortTopDown", fn: mergeSortTopDown },
      { name: "shellSort", fn: shellSort },
      { name: "insertionSort", fn: insertionSort },
      { name: "heapSort", fn: heapSort },
      { name: "radixSortLSD", fn: radixSortLSD },
      { name: "radixSortMSD", fn: radixSortMSD },
      { name: "pancakeSort", fn: pancakeSort },
      { name: "timSort", fn: timSort },
      { name: "introSort", fn: introSort },
      { name: "inplaceMergeSort", fn: inplaceMergeSort },
      { name: "parallelMergeSort", fn: parallelMergeSort },
      { name: "bucketSort", fn: bucketSort },
    ];

    try {
      const results = await Promise.all(
        algorithms.map(async ({ name, fn }) => {
          try {
            const data = await fn(payload);
            const steps = data.results && Array.isArray(data.results) ? data.results : [];
            const finalStep = steps[steps.length - 1] || [];
            const isSorted = steps.length > 0 && finalStep.every((val, i) => i === 0 || val >= finalStep[i - 1]);
            return { name, steps, isSorted, totalSteps: steps.length };
          } catch (err) {
            console.error(`Error sorting ${name}:`, err);
            return { name, error: err.message };
          }
        })
      );

      results.forEach(({ name, steps, isSorted, totalSteps, error }) => {
        updateState({
          [`${name}Steps`]: steps || [],
          [`${name}Sorted`]: isSorted,
          [`${name}TotalSteps`]: totalSteps,
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
          mergeSortBottomUp: false,
          mergeSortTopDown: false,
          shellSort: false,
          insertionSort: false,
          heapSort: false,
          radixSortLSD: false,
          radixSortMSD: false,
          pancakeSort: false,
          timSort: false,
          introSort: false,
          inplaceMergeSort: false,
          parallelMergeSort: false,
          bucketSort: false,
        },
      });
    }
  };

  return (
    <Box p={6} pt={{ base: "80px", md: "60px" }} mx="auto" maxW="1600px">
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color="white" fontWeight="bold">
          Sorting Algorithm Visualizer
        </Heading>
        <NumberGeneratorForm
          value={state.value}
          loading={state.loading.generate}
          onValueChange={(val) => updateState({ value: val })}
          onSubmit={handleSubmit}
          width="100%"
        />
        {state.error && (
          <Alert status="error" bg="red.900" color="gray.100" borderRadius="md">
            <AlertIcon color="red.300" />
            {state.error}
          </Alert>
        )}
        {state.numbers.length > 0 && (
          <VStack spacing={8} align="stretch">
            {state.showTiles && (
              <SimpleGrid
                ref={graphRef}
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={8}
              >
                <AlgorithmTile
                  algorithm="Bubble Sort"
                  steps={state.bubbleSortSteps}
                  isSorted={state.bubbleSortSorted}
                  totalSteps={state.bubbleSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.bubbleSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Bucket Sort"
                  steps={state.bucketSortSteps}
                  isSorted={state.bucketSortSorted}
                  totalSteps={state.bucketSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.bucketSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Heap Sort"
                  steps={state.heapSortSteps}
                  isSorted={state.heapSortSorted}
                  totalSteps={state.heapSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.heapSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Insertion Sort"
                  steps={state.insertionSortSteps}
                  isSorted={state.insertionSortSorted}
                  totalSteps={state.insertionSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.insertionSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Inplace Merge Sort"
                  steps={state.inplaceMergeSortSteps}
                  isSorted={state.inplaceMergeSortSorted}
                  totalSteps={state.inplaceMergeSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.inplaceMergeSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Intro Sort"
                  steps={state.introSortSteps}
                  isSorted={state.introSortSorted}
                  totalSteps={state.introSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.introSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Merge Sort Bottom Up"
                  steps={state.mergeSortBottomUpSteps}
                  isSorted={state.mergeSortBottomUpSorted}
                  totalSteps={state.mergeSortBottomUpTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.mergeSortBottomUp}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Merge Sort Top Down"
                  steps={state.mergeSortTopDownSteps}
                  isSorted={state.mergeSortTopDownSorted}
                  totalSteps={state.mergeSortTopDownTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.mergeSortTopDown}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Pancake Sort"
                  steps={state.pancakeSortSteps}
                  isSorted={state.pancakeSortSorted}
                  totalSteps={state.pancakeSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.pancakeSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Parallel Merge Sort"
                  steps={state.parallelMergeSortSteps}
                  isSorted={state.parallelMergeSortSorted}
                  totalSteps={state.parallelMergeSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.parallelMergeSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Quick Sort"
                  steps={state.quickSortSteps}
                  isSorted={state.quickSortSorted}
                  totalSteps={state.quickSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.quickSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Radix Sort LSD"
                  steps={state.radixSortLSDSteps}
                  isSorted={state.radixSortLSDSorted}
                  totalSteps={state.radixSortLSDTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.radixSortLSD}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Radix Sort MSD"
                  steps={state.radixSortMSDSteps}
                  isSorted={state.radixSortMSDSorted}
                  totalSteps={state.radixSortMSDTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.radixSortMSD}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Selection Sort"
                  steps={state.selectionSortSteps}
                  isSorted={state.selectionSortSorted}
                  totalSteps={state.selectionSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.selectionSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Shell Sort"
                  steps={state.shellSortSteps}
                  isSorted={state.shellSortSorted}
                  totalSteps={state.shellSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.shellSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
                <AlgorithmTile
                  algorithm="Tim Sort"
                  steps={state.timSortSteps}
                  isSorted={state.timSortSorted}
                  totalSteps={state.timSortTotalSteps}
                  onSort={handleSortSingle}
                  loading={state.loading.timSort}
                  isSortingAll={state.isSortingAll}
                  hasSortedAll={state.hasSortedAll}
                  height={150}
                />
              </SimpleGrid>
            )}
            <Button
              variant="solid"
              onClick={handleSortAll}
              width={{ base: "100%" }}
              alignSelf="center"
              fontSize="lg"
              isDisabled={state.isSortingAll}
              colorScheme="blue"
            >
              Sort All
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}