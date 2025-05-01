import { Box, Text, Button } from "@chakra-ui/react";
import SortingChart from "./SortingChart";

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
    <Box borderWidth={1} borderRadius="md" p={4} bg="gray.800" borderColor="gray.600">
      <Text fontSize="lg" fontWeight="semibold" mb={2} color="white" align={"center"}>
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
        mt={2}
        width="100%"
        variant="solid"
        fontSize="md"
      >
        Sort
      </Button>
    </Box>
  );
};

export default AlgorithmTile;