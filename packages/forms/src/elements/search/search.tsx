import React, { useState, useEffect } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Flex } from '@tpr/core';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import AccessibilityHelper from '../accessibilityHelper';
import Autocomplete from 'accessible-autocomplete/react';
import { filterResults, formatResults } from './filterResults';
import styles from './search.module.scss';

interface SearchProps extends FieldRenderProps<string>, FieldExtraProps {
	optionsArray?: any[];
	notFoundMessage?: string;
	keyValue: string;
	searchService?: (x:string) => Promise<any>;
	callback?: Function;
}

type panelVisibility = 
	'visible'|
	'hidden'|
	'complete'
;

const Search: React.FC<SearchProps> = React.memo(
	({
		optionsArray = [],
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
		searchService,
		name,
		...rest
	}) => {
		const [panelVisible, setPanelVisible] = useState<panelVisibility>('hidden');
		const [classes, setClasses] = useState(styles.autocomplete);
		const [optionsArrayStrings, setOptionsArrayStrings] = useState([]);
		const [optionsArrayObjects, setOptionsArrayObjects] = useState([]);

		const setGlobalArrays = (resultsFiltered) => {			
			setOptionsArrayObjects(resultsFiltered.objects);
			setOptionsArrayStrings(resultsFiltered.strings);
		}

		const showResults = (query) => {
			// Function that filters the results when the options are passed directly as an array of values
			console.log('showResults');
			// set panelVisible=visible in case it was hidden
			if (panelVisible == 'hidden') setPanelVisible('visible');

			const resultsFiltered = filterResults(query, optionsArray, keyValue);
			console.log('resultsFiltered', resultsFiltered);

			setGlobalArrays(resultsFiltered);
			return resultsFiltered.strings;
		};

		const useSearchService = async (query:string) => {
			// Function that process the results when receiving 'searchService' for making the search
			console.log('useSearchService');
			let resutsFormatted = [];

			await searchService(query).then(resultsFiltered => {
				resutsFormatted = formatResults(resultsFiltered);
				setGlobalArrays(resultsFiltered);
				console.log('resultsFiltered', resultsFiltered);
				// set panelVisible=visible in case it was hidden
				if (panelVisible == 'hidden') setPanelVisible('visible');
				console.log('resutsFormatted', resutsFormatted);
			});
			//const resutsFormatted = formatResults(resultsFiltered)
			console.log('resutsFormatted', resutsFormatted);

			return resutsFormatted;
		}

		const getResults = (query, syncResults) => {
			syncResults(query ? searchService ? useSearchService(query) : showResults(query) : []);
		};

		const toggleResultsPanel = () => {
			console.log('toggleResultsPanel');
			const newClasses = panelVisible == 'complete'
				? styles.autocomplete + ' ' + styles.hide
				: panelVisible == 'visible'
					? styles.autocomplete + ' ' + styles.panelVisible
					: styles.autocomplete;
			if (newClasses !== classes) setClasses(newClasses);
		};

		const chooseOption = (value: string) => {
			console.log('chooseOption');
			if (value) {
				// set panelVisible=complete when option has been selected
				setPanelVisible('complete');
				const objectSelected =
					optionsArrayObjects[optionsArrayStrings.indexOf(value)];

				callback(objectSelected);
			}
		};

		useEffect(() => {
			console.log('useEffect');
			toggleResultsPanel();
		}, [panelVisible]);

		const helper = new AccessibilityHelper(rest['id'], !!label, !!hint);

		return (
			<div className={classes}>
				<StyledInputLabel
					element="label"
					isError={meta && meta.touched && meta.error}
					cfg={Object.assign({ flexDirection: 'column' }, cfg)}
					{...rest.ariaLabel}
				>
					<InputElementHeading
						label={label}
						required={required}
						hint={hint}
						meta={meta}
						accessibilityHelper={helper}
					/>
					<Flex
						cfg={{ width: inputWidth, flexDirection: 'column' }}
						className={styles.relative}
					>
						<Autocomplete
							name={name}
							source={getResults}
							onConfirm={chooseOption}
							showAllValues={false}
							minLength={3}
							tNoResults={() => notFoundMessage}
							placeholder={placeholder}
						/>
					</Flex>
				</StyledInputLabel>
			</div>
		);
	},
);

export const FFSearch: React.FC<
	FieldProps & Omit<SearchProps, 'children'>
> = React.memo((fieldProps) => {
	return (
		<Field
			{...fieldProps}
			render={(props) => <Search {...props} name={fieldProps.name} />}
		/>
	);
});
