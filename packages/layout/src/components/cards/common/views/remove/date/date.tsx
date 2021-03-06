import React from 'react';
import { Link, P } from '@tpr/core';
import { Form, FFCheckbox, renderFields, FieldProps } from '@tpr/forms';
import { Content } from '../../../../components/content';
import { Footer } from '../../../../components/card';
import { ArrowButton } from '../../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../../../common/interfaces';
import styles from './date.module.scss';

interface DateFormProps {
	title: string;
	onSubmit: (any) => void;
	remove: any;
	label: string;
	dateField: FieldProps[];
	type: cardType;
	typeName: cardTypeName;
	send?: Function;
}

const DateForm: React.FC<DateFormProps> = ({
	title,
	onSubmit,
	remove,
	label,
	dateField,
	type,
	typeName,
	send,
}) => {
	const errorMsg: string = `${type}-error-msg`;
	const testId: string = `remove-${type}-form`;

	return (
		<Content type={type} typeName={typeName} title={title}>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					confirm: remove?.confirm,
					date: remove && remove.date && new Date(remove.date),
				}}
			>
				{({ handleSubmit, submitError }) => (
					<form onSubmit={handleSubmit} data-testid={testId}>
						<div aria-describedby={errorMsg}>
							<FFCheckbox
								name="confirm"
								type="checkbox"
								label={label}
								cfg={{ mb: 3 }}
							/>
							<div className={styles.dateWrapper}>
								{renderFields(dateField)}
							</div>
						</div>
						{submitError && (
							<P id={errorMsg} className={styles.errorMsg}>
								{submitError}
							</P>
						)}
						<Footer>
							<ArrowButton
								appearance="secondary"
								pointsTo="right"
								iconSide="right"
								title="Continue"
								type="submit"
							/>
							<Link cfg={{ m: 3 }} underline onClick={() => send('CANCEL')}>
								Cancel
							</Link>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default React.memo(DateForm);
