import React, { useState } from "react";
import { Box, Heading, Button, Text } from "@chakra-ui/react";
import SortingChart from "./SortingChart";

const AlgorithmTile = ({ algorithm, steps, isSorted, onSort, loading, isSortingAll, hasSortedAll, height }) => {
  const [clicked, setClicked] = useState(false);


  const handleSort = () => {
    setClicked(true);
    onSort(algorithm);
  };

  return (
    <Box p={1} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={1} textAlign={"center"}>
        {algorithm}
      </Heading>
      <SortingChart steps={steps} algorithm={algorithm} isSorted={isSorted} hgt={height}/>
      <Button
        type="button"
        colorScheme="blue"
        isLoading={loading}
        loadingText="Sorting..."
        onClick={handleSort}
        isDisabled={clicked || isSortingAll || hasSortedAll} 
        width="full"
        my={1}
        paddingLeft={0}
        marginTop={1}
      >
        Sort
      </Button>
    </Box>
  );
};

export default AlgorithmTile;