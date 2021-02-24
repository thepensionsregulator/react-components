export const filterResults = (query, optionsArray, keyValue) => {
	// filter the results
	const results = optionsArray.filter((option) => {
		return option[keyValue].toLowerCase().indexOf(query.toLowerCase()) !== -1;
	});

	const stringResult = formatResults(results);
	console.log('stringResult', stringResult);

	return {
		strings: stringResult,
		objects: results,
	};
};

export const formatResults = (results:any) => {
	// generate the array with the results in string format to be displayed
	let stringResult = [];

	results.forEach((option) => {
		let newString = '';
		for (var x in option) {
			newString += '<p>' + option[x] + '</p>';
		}
		stringResult.push(newString);
	});

	return stringResult;
}

