import React, { useState } from 'react';
import { H3, P, Hr, Link } from '@tpr/core';
import { useTrusteeContext } from '../../../context';
import { Footer, FooterButton } from '../../../../components/card';
import { Content } from '../../../../components/content';
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
	const { trustee, leftTheScheme } = current.context;

	function handleRemove() {
		setLoading(true);
		onRemove({
			id: trustee.id,
			reason: {
				leftTheScheme: leftTheScheme ? true : false,
				date: leftTheScheme,
			},
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
			breadcrumbs={() => <Breadcrumbs links={breadcrumbLinks} />}
		>
			<H3 cfg={{ mt: 3, fontWeight: 2 }}>
				Are you sure you want to remove this trustee?
			</H3>
			<Hr cfg={{ my: 4 }} />
			<P cfg={{ color: 'neutral.3' }}>This can't be undone.</P>
			<Footer>
				<FooterButton
					disabled={loading}
					title="Remove"
					intent="danger"
					onClick={handleRemove}
					loadingMessage="Removing..."
				/>
				<Link
					disabled={loading}
					cfg={{ m: 3 }}
					onClick={() => send('CANCEL')}
					underline
				>
					Cancel
				</Link>
			</Footer>
		</Content>
	);
};

export default RemoveConfirm;
