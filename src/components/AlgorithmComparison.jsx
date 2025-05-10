import React, { useState, useEffect } from "react";
import { Box, Text, Button, VStack, Heading } from "@chakra-ui/react";
import SortingChart from './SortingChart'; 

// Updated dictionary for algorithm complexities
const algorithmComplexities = {
  "Bottom Up": {
    time: "O(n log n)",
    space: "O(k)",
  },
  "Top Down": {
    time: "O(n log n)",
    space: "O(k)",
  },
  "Inplace": {
    time: "O(n log n)",
    space: "O(1)",
  },
  "Parallel": {
    time: "O(n log n)",
    space: "O(n)",
  },
  "Least Significant Digit": {
    time: "O(nk)",
    space: "O(n + k)",
  },
  "Most Significant Digit": {
    time: "O(nk)",
    space: "O(n + k)",
  },
};

const AlgorithmComparison = ({
  algorithm,
  steps,
  isSorted,
  onSort,
  loading,
  isSortingAll,
  hasSortedAll,
  height,
  totalSteps,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleSort = async () => {
    setClicked(true);
    try {
      await onSort(algorithm);
    } finally {
      setClicked(false);
    }
  };

  const complexities = algorithmComplexities[algorithm] || {
    time: "N/A",
    space: "N/A"
  };

  return (
    <Box>
      <VStack spacing={2} align="center" mt={4} color="white">
        <Heading className="tile-title" color={"white"} textStyle="xl" size={"sm"} textAlign="center">
          {algorithm}
        </Heading>
        <Text textStyle="xs" textAlign="center">
          Time {complexities.time} Space {complexities.space}
        </Text>
      </VStack>
      
      <SortingChart
        steps={steps}
        algorithm={algorithm}
        isSorted={isSorted}
        hgt={height}
        totalSteps={totalSteps}
      />
      
      {onSort && (
        <Button
          type="button"
          colorScheme="blue"
          isLoading={loading}
          loadingText="Sorting..."
          onClick={handleSort}
          isDisabled={clicked || isSorted || isSortingAll || hasSortedAll}
          width="full"
          my={1}
          marginTop={1}
        >
          Sort
        </Button>
      )}
    </Box>
  );
};

export default AlgorithmComparison;
