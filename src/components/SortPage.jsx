import React from "react";
import { useState } from "react";
import { Alert, AlertIcon, Box, VStack, Heading, Text, Tooltip } from "@chakra-ui/react";
import NumberGeneratorForm from "./NumberGeneratorForm";
import AlgorithmTile from "./AlgorithmTile";
import { generateNumbers } from "../Api";
import { spaceComplexities, timeComplexities } from "../utils/timeComplexities";
import PropTypes from "prop-types";

export default function SortPage({ algorithmName, sortFunction }) {
  const [state, setState] = useState({
    value: 50,
    numbers: [],
    sortSteps: [],
    isSorted: false,
    totalSteps: undefined,
    error: null,
    showTiles: false,
    loading: { generate: false, sort: false }
  });

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e, value) => {
    updateState({
      error: null,
      numbers: [],
      sortSteps: [],
      isSorted: false,
      totalSteps: undefined,
      showTiles: false,
      loading: { ...state.loading, generate: true }
    });

    const payload = {
      value: parseInt(value),
      maxRange: parseInt(value)
    };

    try {
      const data = await generateNumbers(payload);
      const numbers = data.results || [];
      updateState({
        numbers,
        sortSteps: [numbers],
        isSorted: false,
        totalSteps: undefined,
        showTiles: true,
        loading: { ...state.loading, generate: false }
      });
    } catch (err) {
      updateState({
        error: err.message,
        loading: { ...state.loading, generate: false }
      });
    }
  };

  const handleSort = async () => {
    updateState({
      error: null,
      loading: { ...state.loading, sort: true }
    });

    const payload = { values: state.numbers };

    try {
      const data = await sortFunction(payload);
      const steps = data.results && Array.isArray(data.results) ? data.results : [];
      const finalStep = steps[steps.length - 1] || [];
      const isSorted =
        steps.length > 0 && finalStep.every((val, i) => i === 0 || val >= finalStep[i - 1]);
      updateState({
        sortSteps: steps,
        isSorted,
        totalSteps: steps.length,
        loading: { ...state.loading, sort: false }
      });
    } catch (err) {
      console.error(`Error sorting ${algorithmName}:`, err);
      updateState({
        error: err.message,
        loading: { ...state.loading, sort: false }
      });
    }
  };

  const timeComplexity = timeComplexities[algorithmName] || "Unknown";
  const spaceComplexity = spaceComplexities[algorithmName] || "Unknown";
  return (
    <Box p={6} pt={{ base: "80px", md: "60px" }} mx="auto" maxW="1600px" bg="gray.800">
      <VStack spacing={8} align="stretch">
        <Heading pt="40px" as="h1" size="xl" textAlign="center" color="white" fontWeight="bold">
          {algorithmName} Visualizer
        </Heading>
        {/* Display Time Complexity */}
        <Tooltip label="Estimated time complexity of the selected algorithm" fontSize="md">
          <Text textAlign="center" color="gray.300" fontSize="lg">
            Time Complexity: <strong>{timeComplexity}</strong> Space Complexity:{" "}
            <strong>{spaceComplexity}</strong>
          </Text>
        </Tooltip>
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
          <>
            {state.error && (
              <Alert
                status="error"
                mt={4}
                maxW="1600px"
                mx="auto"
                bg="red.900"
                color="gray.100"
                borderRadius="md"
              >
                <AlertIcon color="red.300" />
                {state.error}
              </Alert>
            )}
            {state.showTiles && (
              <AlgorithmTile
                algorithm={algorithmName}
                steps={state.sortSteps}
                isSorted={state.isSorted}
                totalSteps={state.totalSteps}
                onSort={handleSort}
                loading={state.loading.sort}
                isSortingAll={false}
                hasSortedAll={false}
                height={400}
                timeComplexity={timeComplexity}
              />
            )}
          </>
        )}
      </VStack>
    </Box>
  );
}

SortPage.propTypes = {
  algorithmName: PropTypes.string.isRequired,
  sortFunction: PropTypes.func.isRequired
};
