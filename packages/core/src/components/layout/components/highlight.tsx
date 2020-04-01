import React from 'react';
import { DocWidth, AppWidth, Flex } from './globals';
import { P } from '../../typography';

type HighlightProps = {
	title: string;
	scheme: string;
};

export const Highlight: React.FC<HighlightProps> = ({
	title = 'Scheme return — Test Scheme: DC Scheme 3 SQL Update',
	scheme = 'PSR: 12014314',
}) => {
	return (
		<DocWidth justifyContent="center">
			<AppWidth>
				<Flex
					flex="0 0 auto"
					height="50px"
					width="100%"
					bg="accents.300"
					color="white"
				>
					<Flex flex="1 1 auto" alignItems="center" px={3}>
						<P>{title}</P>
					</Flex>
					<Flex
						flex="0 0 auto"
						width="200px"
						bg="#000"
						alignItems="center"
						justifyContent="center"
					>
						<P color="white">{scheme}</P>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
