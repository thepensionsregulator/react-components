export const filterResults = (query, options, keyValue) => {
  // filter the results
  const results = options.filter((option) => {
    return option[keyValue].toLowerCase().indexOf(query.toLowerCase()) !== -1
  });

  // generate the array with the results in string format to be displayed
  let stringResult = [];

  results.forEach((option) => {
    let newString = ''
    for (var x in option) {
      newString += '<p>' + option[x] + '</p>'
    }
    stringResult.push(newString);
  });

  //return stringResult;
  return {
    strings: stringResult,
    objects: results
  }
}
