import React, { useState, useEffect, useRef } from 'react';
//import Downshift, { DownshiftProps } from 'downshift';
import { Field, FieldRenderProps } from 'react-final-form';
import { Flex } from '@tpr/core';
import { StyledInputLabel, InputElementHeading } from '../elements';
//import { Input } from '../input/input';
import { FieldProps, FieldOptions, FieldExtraProps } from '../../renderFields';
import Autocomplete from 'accessible-autocomplete/react';
import { filterResults } from './filterResults';
import styles from './search.module.scss';

interface SearchProps extends FieldExtraProps {
	options?: FieldOptions[];
	notFoundMessage?: string;
	keyValue: string;
	callback?: Function;
}

const Search: React.FC<SearchProps & FieldRenderProps<string>> = React.memo(({
	options,
	label,
	required,
	hint,
	meta,
	notFoundMessage = 'Your search criteria has no match',
	testId = 'search',
	placeholder,
	inputWidth,
	cfg,
	keyValue,
	callback,
	name,
	...rest
}) => {
	const [panelVisible, setPanelVisible] = useState(false);
	const [classes, setClasses] = useState(styles.autocomplete);
	//const [inputValue, setInputValue] = useState(undefined);
	const [optionsArrayStrings, setOptionsArrayStrings] = useState([]);
	const [optionsArrayObjects, setOptionsArrayObjects] = useState([]);

	const showResults = (query) => {
		// set panelVisible=true in case it was false
		if(!panelVisible) setPanelVisible(true);

		const resultsFiltered = filterResults(query, options, keyValue);

		setOptionsArrayObjects(resultsFiltered.objects);
		setOptionsArrayStrings(resultsFiltered.strings);

		return resultsFiltered.strings;
	}

	const getResults = (query, syncResults) => {
		syncResults(query
			? showResults(query)
			: []
		);
	}

	const toggleResultsPanel = () => {
		const newClasses = panelVisible ? styles.autocomplete + ' ' + styles.panelVisible : styles.autocomplete;
		if(newClasses !== classes) setClasses(newClasses); 
	}

	const chooseOption = (value) => {
		panelVisible && setPanelVisible(false);
		//setInputValue(value);
		if(value) {
			console.log('chooseOption - value', value);
			const objectSelected = optionsArrayObjects[optionsArrayStrings.indexOf(value)];

			callback(objectSelected);
		}
	}

	useEffect(() => {
		toggleResultsPanel();
	}, [panelVisible]);

	const accessibleInput = useRef(null);

	return (
				<div className={classes}>
					<StyledInputLabel
						element="div"
						isError={meta && meta.touched && meta.error}
						cfg={Object.assign({ flexDirection: 'column' }, cfg)}
						{...rest}
					>
						<InputElementHeading
							label={label}
							required={required}
							hint={hint}
							meta={meta}
						/>
						<Flex cfg={{ width: inputWidth, flexDirection: 'column' }} className={styles.relative}>
							{/* <Input
									type="text"
									className={styles.hiddenInput}
									value={inputValue}
								/> */}
							<Autocomplete
								ref={accessibleInput}
								name={name}
								source={getResults}
								onConfirm={chooseOption}
								showAllValues={false}
								tNoResults={() => notFoundMessage}
								placeholder={placeholder}
							/>
						</Flex>
					</StyledInputLabel>
				</div>
	);
});

export const FFSearch: React.FC<FieldProps & Omit<SearchProps, 'children'>> = React.memo((
	fieldProps,
) => <Field component={Search} {...fieldProps} />);
