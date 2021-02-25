import React, { useState, useEffect } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Flex } from '@tpr/core';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import AccessibilityHelper from '../accessibilityHelper';
import Autocomplete from 'accessible-autocomplete/react';
import { filterResults, formatItemDefault } from './filterResults';
import styles from './search.module.scss';

interface SearchProps extends FieldRenderProps<string>, FieldExtraProps {
	callback?: Function;
	formatItem?: (item: any) => string;
	getSelectedItem?: (item: any) => string;
	keyValue: string;
	notFoundMessage?: string;
	optionsArray?: any[];
	searchService?: (x:string) => Promise<any>;
}

type PanelVisibility = 'visible' | 'hidden' | 'complete';

const Search: React.FC<SearchProps> = React.memo(
	({
		callback,
		cfg,
		formatItem = formatItemDefault,
		getSelectedItem,
		hint,
		inputWidth = 10,
		keyValue,
		label,
		meta,
		name,
		notFoundMessage = 'Your search criteria has no match',
		optionsArray = [],
		placeholder,
		required = true,
		searchService,
		testId = 'search',
		...rest
	}) => {
		const [panelVisible, setPanelVisible] = useState<PanelVisibility>('hidden');
		const [classes, setClasses] = useState(styles.autocomplete);
		const [optionsArrayObjects, setOptionsArrayObjects] = useState([]);

		const getSelectedItemDefault = (item) => {
			return item && item[keyValue];
		}

		const setGlobalArrays = (resultsFiltered) => {			
			setOptionsArrayObjects(resultsFiltered);
			if (panelVisible == 'hidden') setPanelVisible('visible');
		}

		// Function that filters the results when the options are passed directly as an array of values
		const showResults = (query:string):any[] => {
			const results = filterResults(query, optionsArray, keyValue);
			setGlobalArrays(results);
			return results;
		};

		// Function that process the results when receiving 'searchService' for making the search
		const useSearchService = (apiResponse):any[] => {
			setGlobalArrays(apiResponse);
			return apiResponse;
		}

		const getResults = async (query:string, populateResults:Function) => {
			searchService
			? await searchService(query)
							.then(response => populateResults(query ? useSearchService(response) : []))
			: populateResults(query ? showResults(query) : []);
		};

		const toggleResultsPanel = () => {
			const newClasses = panelVisible == 'complete'
				? styles.autocomplete + ' ' + styles.hide
				: panelVisible == 'visible'
					? styles.autocomplete + ' ' + styles.panelVisible
					: styles.autocomplete;
			if (newClasses !== classes) setClasses(newClasses);
		};

		const chooseOption = (value: string) => {
			if (value) {
				setPanelVisible('complete');
				const objectSelected = optionsArrayObjects[optionsArrayObjects.indexOf(value)];
				callback && callback(objectSelected);
			}
		};

		useEffect(() => {
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
							id={testId}
							source={getResults}
							onConfirm={chooseOption}
							showAllValues={false}
							minLength={3}
							tNoResults={() => notFoundMessage}
							placeholder={placeholder}
							templates={{
								inputValue: getSelectedItem ? getSelectedItem : getSelectedItemDefault,
								suggestion: formatItem
							}}
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
