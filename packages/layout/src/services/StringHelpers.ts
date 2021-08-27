export const removeExtraWhiteSpaces = (value: string): string => {
	/*
    Removes unneccessary white spaces in a string.
    E.g.
        " The Pensions Regulator  "     => "The Pensions Regulator"
        "The   Pensions   Regulator"    => "The Pensions Regulator"
        "   The   Pensions  Regulator " => "The Pensions Regulator"
  */
	return value.replace(/ +(?= )/g, '').trim();
};

export const capitalize = (value: string): string => {
	/*
    Capitalizes string with only first letter in uppercase.
    E.g.
        "The Pensions Regulator  " => "The pensions regulator"
        "the  pensions regulator"  => "The pensions regulator"
        " THE PENSIONS REGULATOR"  => "The pensions regulator"
  */
	const cleanValue = removeExtraWhiteSpaces(value);
	return cleanValue[0].toUpperCase() + cleanValue.slice(1).toLowerCase();
};

export const capitalizeEachWord = (value: string): string => {
	/*
    Capitalizes all words in the string.
    E.g.
        "the  pensions regulator"   => "The Pensions Regulator"
        " THE PENSIONS REGULATOR"   => "The Pensions Regulator"
        "45/50 MAIN ROAD  "         => "45/50 Main Road"
        "45 FIRST FLOOR, MAIN ROAD" => "45 First Floor, Main Road"
  */
	const words = removeExtraWhiteSpaces(value).split(' ');
	return words
		.map((word) => {
			return word[0].toUpperCase() + word.substring(1).toLowerCase();
		})
		.join(' ');
};
