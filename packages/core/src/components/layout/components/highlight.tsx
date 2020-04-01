import React from 'react';
import { DocWidth, AppWidth, Flex } from './globals';
import { P } from '../../typography';

type HighlightProps = {
	title: string;
	scheme: string;
};

export const Highlight: React.FC<HighlightProps> = ({
	title = '',
	scheme = '',
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
					<Flex
						flex="0 0 auto"
						width="240px"
						alignItems="center"
						justifyContent="left"
						borderTop="1px solid"
						borderColor="accents.200"
					>
						<P fontWeight={3} pl={1}>
							Scheme return
						</P>
					</Flex>
					<Flex
						flex="1 1 auto"
						alignItems="center"
						justifyContent="space-between"
						px={3}
						bg="accents.400"
					>
						<P fontWeight={3}>{title}</P>
						<Flex
							borderLeft="2px solid"
							height="70%"
							alignItems="center"
							borderColor="accents.200"
							pl={2}
						>
							<P fontWeight={3}>PSR: {scheme}</P>
						</Flex>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
