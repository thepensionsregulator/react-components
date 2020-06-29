import React, { useState } from 'react';
import { Hr, Flex, P, H3, Link } from '@tpr/core';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import { useEmployerContext } from '../../../context';
import styles from './confirm.module.scss';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';

const breadcrumbLinks: BreadcrumbLink[] = [
	{
		to: 'BACK',
		underline: true,
		name: 'Remove this employer',
	},
	{
		name: 'Are you sure...?',
		disabled: true,
	},
];

export const Confirm = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, onRemove } = useEmployerContext();
	const { employer, remove } = current.context;

	function handleRemove() {
		setLoading(true);
		onRemove({
			schemeRoleId: employer.schemeRoleId,
			date: remove.date,
		})
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}

	return (
		<Content
			type="trustee"
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} send={send} />}
		>
			<H3 cfg={{ mt: 3, fontWeight: 2 }}>
				Are you sure you want to remove this employer?
			</H3>
			<Hr cfg={{ my: 4 }} />
			<Flex
				cfg={{ flexDirection: 'column', p: 4, my: 4 }}
				className={styles.confirmBox}
			>
				<P>
					Removing an employer here does not absolve them of their legal
					responsabilities. You must ensure that all nescessary steps to
					administer their withdrawl or cessation have been carried out before
					proceeding.
				</P>
				<P cfg={{ my: 3 }}>This can't be undone.</P>
				<Flex>
					<ArrowButton
						intent="danger"
						pointsTo="right"
						iconSide="right"
						title="Remove employer"
						onClick={handleRemove}
						disabled={loading}
					/>
					<Link cfg={{ m: 3 }} underline onClick={() => send('CANCEL')}>
						Cancel
					</Link>
				</Flex>
			</Flex>
		</Content>
	);
};
