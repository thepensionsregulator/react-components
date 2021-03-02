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
	assistiveHint?: string;
	callback?: Function;
	formatItem?: (item: any) => string;
	getSelectedItem?: (item: any) => string;
	keyValue: string;
	labelNotBold?: boolean;
	minLength?: number;
	notFoundMessage?: string;
	optionsArray?: any[];
	searchService?: (x: string) => Promise<any>;
}

type PanelVisibility = 'visible' | 'hidden' | 'complete';

const Search: React.FC<SearchProps> = React.memo(
	({
		assistiveHint = 'When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.',
		callback,
		cfg,
		formatItem = formatItemDefault,
		getSelectedItem,
		hint,
		id,
		inputWidth = 10,
		keyValue,
		label,
		labelNotBold = false,
		meta,
		minLength,
		name,
		notFoundMessage = 'There are no matches for your search criteria',
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
					cfg={Object.assign({ flexDirection: 'column' }, cfg)}
					element="label"
					isError={meta && meta.touched && meta.error}
					{...rest.ariaLabel}
				>
					<InputElementHeading
						accessibilityHelper={helper}
						hint={hint}
						label={label}
						labelNotBold={labelNotBold}
						meta={meta}
						required={required}
					/>
					<Flex
						cfg={{ width: inputWidth, flexDirection: 'column' }}
						className={styles.relative}
					>
						<Autocomplete
							id={id}
							minLength={minLength}
							name={name}
							onConfirm={chooseOption}
							placeholder={placeholder}
							showAllValues={false}
							source={getResults}
							tAssistiveHint={() => assistiveHint}
							templates={{
								inputValue: getSelectedItemDefault,
								suggestion: formatItem,
							}}
							testId={testId}
							tNoResults={() => notFoundMessage}
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
