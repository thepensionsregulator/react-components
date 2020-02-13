import React from 'react';
import { DocWidth, AppWidth, Flex } from './globals';

export const Header = () => {
	return (
		<DocWidth justifyContent="center" bg="#eeeeee">
			<AppWidth>
				<Flex flexDirection="column">
					<DocWidth justifyContent="space-between" p={2}>
						<div>
							<span>logo</span>
							<span>Exchange - Scheme return</span>
						</div>
						<div>
							<span>Scheme Options</span>
							<span>Log out</span>
						</div>
					</DocWidth>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
