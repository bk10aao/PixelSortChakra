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

export const mergeSort = (payload) =>
	fetchFromApi("/merge-sort", payload, "Failed to sort numbers.");

export const mergeSortTwo = (payload) =>
	fetchFromApi("/merge-sort-two", payload, "Failed to sort numbers.");

export const shellSort = (payload) =>
	fetchFromApi("/shell-sort", payload, "Failed to sort numbers.");
