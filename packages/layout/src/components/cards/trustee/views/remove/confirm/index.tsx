import React, { useState } from 'react';
import { H3, H4, P, Hr, Link, Flex } from '@tpr/core';
import { useTrusteeContext } from '../../../context';
import { FooterButton } from '../../../../components/card';
import { Content } from '../../../../components/content';
import styles from './confirm.module.scss';
import {
	Breadcrumbs,
	BreadcrumbLink,
} from '../../../../components/breadcrumbs';

const breadcrumbLinks: BreadcrumbLink[] = [
	{
		to: 'BACK',
		underline: true,
		name: 'Remove this trustee',
	},
	{
		name: 'Are you sure...?',
		disabled: true,
	},
];

const RemoveConfirm: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, onRemove } = useTrusteeContext();
	const { trustee, remove } = current.context;

	function handleRemove() {
		setLoading(true);
		onRemove(
			{
				schemeRoleId: trustee.schemeRoleId,
				...remove,
			},
			trustee,
		)
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
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} />}
		>
			<H4 cfg={{ mt: 3, color: 'neutral.5' }}>Edit trustee</H4>
			<H3 cfg={{ fontWeight: 2 }}>
				Are you sure you want to remove this trustee?
			</H3>
			<Hr cfg={{ my: 4 }} />
			<Flex
				cfg={{ flexDirection: 'column', p: 4, my: 4 }}
				className={styles.confirmBox}
			>
				<P cfg={{ my: 3 }}>This can't be undone.</P>
				<Flex>
					<FooterButton
						disabled={loading}
						title="Remove this trustee >"
						intent="danger"
						onClick={handleRemove}
						loadingMessage="Removing..."
					/>
					<Link cfg={{ m: 3 }} underline onClick={() => send('CANCEL')}>
						Cancel
					</Link>
				</Flex>
			</Flex>
		</Content>
	);
};

export default RemoveConfirm;
