const API_BASE_URL = "http://localhost:8080";

export const fetchFromApi = async (url, payload, errorMessage) => {
	const response = await fetch(`${API_BASE_URL}${url}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		let message = errorMessage;
		try {
			const errorData = await response.json();
			message = Object.entries(errorData)
				.map(([field, msg]) => `${field}: ${msg}`)
				.join("; ");
		} catch {
			// do nothing
		}
		throw new Error(message);
	}

	return response.json();
};

export const generateNumbers = (payload) =>
	fetchFromApi("/generate-numbers", payload, "Failed to fetch random numbers.");

export const quickSort = (payload) =>
	fetchFromApi("/quick-sort", payload, "Failed to sort numbers.");

export const selectionSort = (payload) =>
	fetchFromApi("/selection-sort", payload, "Failed to sort numbers.");

export const bubbleSort = (payload) =>
	fetchFromApi("/bubble-sort", payload, "Failed to sort numbers.");

export const mergeSortBottomUp = (payload) =>
	fetchFromApi("/merge-sort-bottom-up", payload, "Failed to sort numbers.");

export const mergeSortTopDown = (payload) =>
	fetchFromApi("/merge-sort-top-down", payload, "Failed to sort numbers.");

export const shellSort = (payload) =>
	fetchFromApi("/shell-sort", payload, "Failed to sort numbers.");

export const insertionSort = (payload) =>
	fetchFromApi("/insertion-sort", payload, "Failed to sort numbers.");

export const heapSort = (payload) =>
	fetchFromApi("/heap-sort", payload, "Failed to sort numbers.");

export const radixSortLSD = (payload) =>
	fetchFromApi("/radix-sort-lsd", payload, "Failed to sort numbers.");

export const radixSortMSD = (payload) =>
	fetchFromApi("/radix-sort-msd", payload, "Failed to sort numbers.");

export const pancakeSort = (payload) =>
	fetchFromApi("/pancake-sort", payload, "Failed to sort numbers.");

export const timSort = (payload) =>
	fetchFromApi("/tim-sort", payload, "Failed to sort numbers.");

export const introSort = (payload) =>
	fetchFromApi("/intro-sort", payload, "Failed to sort numbers.");

export const inplaceMergeSort = (payload) =>
	fetchFromApi("/in-place-merge-sort", payload, "Failed to sort numbers.");