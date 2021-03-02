import React, { useState, useEffect } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Flex } from '@tpr/core';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import AccessibilityHelper from '../accessibilityHelper';
import Autocomplete from 'accessible-autocomplete/react';
import { filterResults, formatItemDefault } from './filterResults';
import { act } from 'react-dom/test-utils';
import styles from './search.module.scss';

interface SearchProps extends FieldRenderProps<string>, FieldExtraProps {
	callback?: Function;
	formatItem?: (item: any) => string;
	getSelectedItem?: (item: any) => string;
	keyValue: string;
	minLength?: number;
	notFoundMessage?: string;
	optionsArray?: any[];
	searchService?: (x: string) => Promise<any>;
}

type PanelVisibility = 'visible' | 'hidden' | 'complete';

const Search: React.FC<SearchProps> = React.memo(
	({
		id,
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
		notFoundMessage = 'There are no matches for your search criteria',
		optionsArray = [],
		minLength,
		required = true,
		searchService,
		testId = 'search',
		...rest
	}) => {
		const [panelVisible, setPanelVisible] = useState<PanelVisibility>('hidden');
		const [classes, setClasses] = useState(styles.autocomplete);
		const [optionsArrayObjects, setOptionsArrayObjects] = useState([]);

		const getSelectedItemDefault = (item) => {
			return getSelectedItem ? getSelectedItem(item) : item && item[keyValue];
		};

		const saveResultsInState = (resultsFiltered) => {
			act(() => setOptionsArrayObjects(resultsFiltered));
			if (panelVisible == 'hidden') act(() => setPanelVisible('visible'));
		};

		const showResultsFromOptionsArray = (query: string): any[] => {
			const results = filterResults(query, optionsArray, keyValue);
			saveResultsInState(results);
			return results;
		};

		const showResultsFromSearchService = (apiResponse): any[] => {
			saveResultsInState(apiResponse);
			return apiResponse;
		};

		const getResults = async (query: string, populateResults: Function) => {
			if (searchService) {
				await searchService(query).then((response) =>
					populateResults(query ? showResultsFromSearchService(response) : []),
				);
			} else {
				populateResults(query ? showResultsFromOptionsArray(query) : []);
			}
		};

		const toggleResultsPanel = () => {
			let newClasses = '';
			if (panelVisible == 'complete') {
				newClasses = styles.autocomplete + ' ' + styles.hide;
			} else {
				newClasses =
					panelVisible == 'visible'
						? styles.autocomplete + ' ' + styles.panelVisible
						: styles.autocomplete;
			}
			if (newClasses !== classes) setClasses(newClasses);
		};

		const chooseOption = (value: string) => {
			if (value) {
				setPanelVisible('complete');
				const objectSelected =
					optionsArrayObjects[optionsArrayObjects.indexOf(value)];
				callback && callback(objectSelected);
			}
		};

		useEffect(() => {
			toggleResultsPanel();
		}, [panelVisible]);

		const helper = new AccessibilityHelper(id, !!label, !!hint);

		return (
			<div className={classes}>
				<StyledInputLabel
					element="label"
					isError={meta && meta.touched && meta.error}
					cfg={Object.assign({ flexDirection: 'column' }, cfg)}
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
							id={id}
							source={getResults}
							onConfirm={chooseOption}
							showAllValues={false}
							minLength={minLength}
							tNoResults={() => notFoundMessage}
							placeholder={rest.placeholder}
							templates={{
								inputValue: getSelectedItemDefault,
								suggestion: formatItem,
							}}
							testId={testId}
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
