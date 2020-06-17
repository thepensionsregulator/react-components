import React from 'react';
import { Form, FFCheckbox, FFInputDate } from '@tpr/forms';
import { Content } from '../../../../components/content';
import { Footer, FooterButton } from '../../../../components/card';
import { useEmployerContext } from '../../../context';
import styles from './date.module.scss';

export const DateForm = () => {
	const { send } = useEmployerContext();

	function onSubmit(values) {
		send('NEXT', { values });
	}

	return (
		<Content type="employer" title="Remove this employer">
			<Form onSubmit={onSubmit}>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<FFCheckbox
							name="confirm"
							type="checkbox"
							label="I confirm this employer is no longer associated with the scheme."
							cfg={{ mb: 3 }}
							// validate={(value) => (value ? undefined : 'Cannot be empty')}
						/>
						<div className={styles.dateWrapper}>
							<FFInputDate
								name="date"
								label="Date the employer left the scheme"
								hint="For example, 31 3 2019"
								required={true}
								error="Cannot be left empty!"
								cfg={{ mb: 3 }}
								// validate={(value) => (value ? undefined : 'Cannot be empty')}
							/>
						</div>
						<Footer>
							<FooterButton type="submit" title="Save and close" />
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
