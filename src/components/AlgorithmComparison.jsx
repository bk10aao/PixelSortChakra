import React, { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import SortingChart from "./SortingChart";

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

  return (
    <Box p={1} borderWidth="1px" borderRadius="lg">
      <Text className="tile-title" color={"white"} align={"center"} textStyle="xl">
        {algorithm}
      </Text>
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