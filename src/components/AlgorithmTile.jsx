import {
	Card,
	CardBody,
	Text,
	VStack,
} from "@chakra-ui/react";
import SortingChart from "./SortingChart";

const AlgorithmTile = ({ algorithm, steps }) => (
    <Card borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" align={"center"}>
            {algorithm}
        </Text>
        <CardBody>
            <VStack spacing={2} align="stretch">
                {steps.length > 0 && <SortingChart steps={steps} algorithm={algorithm} />}
            </VStack>
        </CardBody>
    </Card>
);

export default AlgorithmTile;