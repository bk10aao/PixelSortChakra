import {
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
} from "@chakra-ui/react";

const NumberGeneratorForm = ({
	value,
	maxRange,
	loading,
	onValueChange,
	onMaxRangeChange,
	onSubmit,
}) => {
	const handleFormSubmit = (e) => {
		console.log("Form submitted"); // Debug log
		onSubmit(e);
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<VStack spacing={4} align="stretch">
				<FormControl>
					<FormLabel>Number of Random Numbers</FormLabel>
					<Input
						type="number"
						value={value}
						onChange={onValueChange}
						placeholder="Enter a number (0-100)"
						isDisabled={loading}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Maximum Range</FormLabel>
					<Input
						type="number"
						value={maxRange}
						onChange={onMaxRangeChange}
						placeholder="Enter maximum range"
						isDisabled={loading}
					/>
				</FormControl>
				<Button
					type="submit"
					colorScheme="blue"
					isLoading={loading}
					loadingText="Generating..."
				>
					Generate Numbers
				</Button>
			</VStack>
		</form>
	);
};

export default NumberGeneratorForm;