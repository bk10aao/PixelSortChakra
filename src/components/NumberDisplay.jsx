import { Box, Text } from "@chakra-ui/react";

const NumberDisplay = ({ numbers }) => (
	<Box mt={4}>
		<Text fontWeight="bold" fontSize="lg">
			Generated Numbers ({numbers.length}):
		</Text>
		<Text mt={2}>{numbers.join(", ")}</Text>
	</Box>
);

export default NumberDisplay;