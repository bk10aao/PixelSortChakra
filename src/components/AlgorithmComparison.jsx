import React, { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
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
}) => {
  const [clicked, setClicked] = useState(false);

  const handleSort = () => {
    setClicked(true);
    onSort(algorithm);
  };

  return (
    <Box p={1} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={1} textAlign="center">
        {algorithm}
      </Heading>
      <SortingChart
        steps={steps}
        algorithm={algorithm}
        isSorted={isSorted}
        hgt={height}
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