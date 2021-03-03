export const filterResults = (query, optionsArray, keyValue) => {
	return optionsArray.filter((option) => {
		return option[keyValue].toLowerCase().indexOf(query.toLowerCase()) !== -1;
	});
};

export const formatItemDefault = (item) => {
	let formatted: string = '';
	for (let x in item) {
		formatted += `<p>${item[x]}</p>`;
	}
	return formatted;
};
