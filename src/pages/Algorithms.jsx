import { useState } from "react";
import {
	Alert,
	AlertIcon,
	Box,
	Button,
	SimpleGrid,
	VStack,
} from "@chakra-ui/react";
import {
	generateNumbers,
	quickSort,
	selectionSort,
	bubbleSort,
	mergeSort,
	mergeSortTwo,
	shellSort,
} from "../Api";
import NumberDisplay from "../components/NumberDisplay";
import NumberGeneratorForm from "../components/NumberGeneratorForm";
import AlgorithmTile from "../components/AlgorithmTile";

const validateInputs = (value, maxRange) => {
	const parsedValue = parseInt(value);
	const parsedMaxRange = parseInt(maxRange);

	if (isNaN(parsedValue) || isNaN(parsedMaxRange)) {
		return "Please enter valid numbers for both fields.";
	}
	if (parsedValue < 0 || parsedValue > 100) {
		return "Number of random numbers must be between 0 and 100.";
	}
	if (parsedMaxRange < 1) {
		return "Maximum range must be at least 1.";
	}
	return null;
};

export default function Algorithms() {
	console.log("Algorithms rendering"); // Debug log
	const [state, setState] = useState({
		value: "",
		maxRange: "",
		numbers: [],
		quickSortSteps: [],
		selectionSortSteps: [],
		bubbleSortSteps: [],
		mergeSortSteps: [],
		mergeSortTwoSteps: [],
		shellSortSteps: [],
		error: null,
		showTiles: false,
		loading: {
			generate: false,
			quickSort: false,
			selectionSort: false,
			bubbleSort: false,
			mergeSort: false,
			mergeSortTwo: false,
			shellSort: false,
		},
	});

	const updateState = (updates) => setState((prev) => ({ ...prev, ...updates }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("handleSubmit triggered"); // Debug log
		updateState({
			error: null,
			numbers: [],
			quickSortSteps: [],
			selectionSortSteps: [],
			bubbleSortSteps: [],
			mergeSortSteps: [],
			mergeSortTwoSteps: [],
			shellSortSteps: [],
			showTiles: false,
			loading: { ...state.loading, generate: true },
		});

		const error = validateInputs(state.value, state.maxRange);
		if (error) {
			updateState({ error, loading: { ...state.loading, generate: false } });
			return;
		}

		const payload = {
			value: parseInt(state.value),
			maxRange: parseInt(state.maxRange),
		};

		try {
			const data = await generateNumbers(payload);
			const numbers = data.results || [];
			updateState({
				numbers,
				loading: { ...state.loading, generate: false },
			});
		} catch (err) {
			updateState({
				error: err.message,
				loading: { ...state.loading, generate: false },
			});
		}
	};

	const handleSortAll = async () => {
		updateState({
			error: null,
			loading: {
				...state.loading,
				quickSort: true,
				selectionSort: true,
				bubbleSort: true,
				mergeSort: true,
				mergeSortTwo: true,
				shellSort: true,
			},
			showTiles: true,
		});

		const payload = { values: state.numbers };

		const algorithms = [
			{ name: "quickSort", fn: quickSort },
			{ name: "selectionSort", fn: selectionSort },
			{ name: "bubbleSort", fn: bubbleSort },
			{ name: "mergeSort", fn: mergeSort },
			{ name: "mergeSortTwo", fn: mergeSortTwo },
			{ name: "shellSort", fn: shellSort },
		];

		try {
			const results = await Promise.all(
				algorithms.map(async ({ name, fn }) => {
					try {
						const data = await fn(payload);
						console.log(`Sort data for ${name}:`, data); // Debug log
						const steps = data.results && Array.isArray(data.results) ? data.results : [];
						return { name, steps };
					} catch (err) {
						console.error(`Error sorting ${name}:`, err); // Debug log
						return { name, error: err.message };
					}
				})
			);

			results.forEach(({ name, steps, error }) => {
				updateState({
					[`${name}Steps`]: steps || [],
					error: error || state.error,
					loading: { ...state.loading, [name]: false },
				});
			});

			// Update numbers to the final sorted array (using the last algorithm's result)
			const lastSteps = results[results.length - 1].steps;
			updateState({
				numbers: lastSteps.length > 0 ? lastSteps[lastSteps.length - 1] : state.numbers,
			});
		} catch (err) {
			updateState({
				error: err.message,
				loading: {
					...state.loading,
					quickSort: false,
					selectionSort: false,
					bubbleSort: false,
					mergeSort: false,
					mergeSortTwo: false,
					shellSort: false,
				},
			});
		}
	};


	return (
		<Box maxWidth="1440px" p={4}>
			<NumberGeneratorForm
				value={state.value}
				maxRange={state.maxRange}
				loading={state.loading.generate}
				onValueChange={(e) => updateState({ value: e.target.value })}
				onMaxRangeChange={(e) => updateState({ maxRange: e.target.value })}
				onSubmit={handleSubmit}
			/>
			{state.error && (
				<Alert status="error" mt={4}>
					<AlertIcon />
					{state.error}
				</Alert>
			)}
			{state.numbers.length > 0 && (
				<VStack spacing={6} mt={6} align="stretch">
					<NumberDisplay numbers={state.numbers} />
					<Button colorScheme="teal" onClick={handleSortAll}>
						Sort
					</Button>
					{state.showTiles && (
						<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
							<AlgorithmTile
								algorithm="Bubble Sort"
								steps={state.bubbleSortSteps}
							/>
							<AlgorithmTile
								algorithm="Merge Sort"
								steps={state.mergeSortSteps}
							/>
							<AlgorithmTile
								algorithm="Merge Sort Two"
								steps={state.mergeSortTwoSteps}
							/>
							<AlgorithmTile
								algorithm="Quick Sort"
								steps={state.quickSortSteps}
							/>
							<AlgorithmTile
								algorithm="Shell Sort"
								steps={state.shellSortSteps}
							/>
							<AlgorithmTile
								algorithm="Selection Sort"
								steps={state.selectionSortSteps}
							/>
						</SimpleGrid>
					)}
				</VStack>
			)}
		</Box>
	);
}