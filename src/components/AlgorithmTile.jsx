import { Box, Text, Button } from "@chakra-ui/react";
import SortingChart from "./SortingChart";
import "../algorithmtile.css";

const AlgorithmTile = ({
  algorithm,
  steps,
  isSorted,
  totalSteps,
  onSort,
  loading,
  isSortingAll,
  hasSortedAll,
  height,
}) => {
  return (
    <Box className="tile-box">
      <Text className="tile-title" color={"white"} align={"center"} textStyle="xl">
        {algorithm}
      </Text>
      <SortingChart
        steps={steps}
        algorithm={algorithm}
        isSorted={isSorted}
        totalSteps={totalSteps}
        hgt={height}
      />
      <Button
        onClick={() => onSort(algorithm)}
        isLoading={loading}
        isDisabled={isSortingAll || (hasSortedAll && isSorted)}
        className="tile-button"
        colorScheme="blue" // RE-ADD this
      >
        Sort
      </Button>
    </Box>
  );
};

export default AlgorithmTile;
