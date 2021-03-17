import React from 'react';
import Downshift, { DownshiftProps } from 'downshift';
import { UnfoldMore } from '@tpr/icons';
import { Field, FieldRenderProps } from 'react-final-form';
import { Flex, classNames } from '@tpr/core';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldOptions, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import PopupBox from './popup';
import styles from './select.module.scss';
import AccessibilityHelper from '../accessibilityHelper';

interface SelectProps extends DownshiftProps<any>, FieldExtraProps {
	handleNotFoundButtonClick?: Function;
	options?: FieldOptions[];
	notFoundMessage?: string;
	showToggleButton?: boolean;
}

export const selectStateChangeTypes = Downshift.stateChangeTypes;

export const Select: React.FC<SelectProps & FieldRenderProps<string>> = ({
	id,
	options,
	label,
	required,
	hint,
	meta,
	handleNotFoundButtonClick,
	notFoundMessage = 'Your search criteria has no match',
	itemToString,
	initialSelectedItem,
	onChange,
	disabled,
	testId = 'select',
	showToggleButton = true,
	placeholder,
	readOnly = false,
	inputWidth: width,
	cfg,
	...rest
}) => {
	const helper = new AccessibilityHelper(id, !!label, !!hint, false, false);

	return (
		<Downshift
			onChange={onChange}
			itemToString={itemToString}
			initialSelectedItem={initialSelectedItem}
			{...rest}
		>
			{({
				getInputProps,
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				highlightedIndex,
				selectedItem,
				toggleMenu,
				inputValue,
			}) => (
				<div>
					<StyledInputLabel
						element="label"
						isError={meta && meta.touched && meta.error}
						cfg={Object.assign({ flexDirection: 'column' }, cfg)}
						{...getLabelProps()}
					>
						<InputElementHeading
							label={label}
							required={required}
							hint={hint}
							meta={meta}
							accessibilityHelper={helper}
						/>
						<Flex cfg={{ width }} className={styles.relative}>
							<Input
								autoComplete="off"
								type="text"
								testId={testId}
								label={label}
								disabled={disabled}
								placeholder={placeholder}
								readOnly={readOnly}
								onClick={() => toggleMenu()}
								className={styles.input}
								accessibilityHelper={helper}
								{...getInputProps()}
							/>
							{showToggleButton && (
								<button
									type="button"
									disabled={disabled}
									aria-label="open-dropdown"
									data-testid={`${testId}-button`}
									className={styles.iconButton}
									onClick={() => toggleMenu()}
								>
									<UnfoldMore />
								</button>
							)}
						</Flex>
					</StyledInputLabel>
					<Flex cfg={{ width }} className={styles.relative}>
						<div
							{...getMenuProps({
								className: classNames([
									{ [styles['popup-isopen']]: isOpen },
									styles.popup,
								]),
							})}
						>
							{isOpen && (
								<PopupBox
									searchable={!readOnly}
									{...{
										getItemProps,
										inputValue,
										options,
										highlightedIndex,
										selectedItem,
										handleNotFoundButtonClick,
										notFoundMessage,
									}}
								/>
							)}
						</div>
					</Flex>
				</div>
			)}
		</Downshift>
	);
};

export const FFSelect: React.FC<FieldProps & Omit<SelectProps, 'children'>> = (
	fieldProps,
) => {
	return (
		<Field
			{...fieldProps}
			required={typeof fieldProps.validate === 'function' || fieldProps.error}
			render={({
				input,
				initialSelectedItem,
				itemToString = (item: any) => (item ? item.label : ''),
				onChange,
				...props
			}: any) => {
				return (
					<Select
						initialSelectedItem={
							initialSelectedItem ? initialSelectedItem : input.value
						}
						itemToString={itemToString}
						onChange={(value, _ctx) => {
							// override onChange from outside if needed
							if (value && onChange && typeof onChange === 'function') {
								return onChange(value, input.onChange);
							}
							// otherwise forward
							return input.onChange(value);
						}}
						{...props}
					/>
				);
			}}
		/>
	);
};
