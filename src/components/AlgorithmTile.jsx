import React, { useState } from "react";
import { Box, Heading, Button, Text } from "@chakra-ui/react";
import SortingChart from "./SortingChart";

const AlgorithmTile = ({ algorithm, steps, isSorted, onSort, loading, isSortingAll, hasSortedAll }) => {
  const [clicked, setClicked] = useState(false);

  console.log(`${algorithm} tile: isSortingAll = ${isSortingAll}, hasSortedAll = ${hasSortedAll}`); // Debug prop values

  const handleSort = () => {
    setClicked(true);
    onSort(algorithm);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>
        {algorithm}
      </Heading>
      <SortingChart steps={steps} algorithm={algorithm} isSorted={isSorted} />
      <Button
        type="button"
        colorScheme="blue"
        isLoading={loading}
        loadingText="Sorting..."
        onClick={handleSort}
        isDisabled={clicked || isSortingAll || hasSortedAll} // Disable permanently if hasSortedAll
        width="full"
        my={1}
      >
        Sort
      </Button>
    </Box>
  );
};

export default AlgorithmTile;