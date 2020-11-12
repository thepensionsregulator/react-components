import React from 'react';
import { Field } from 'react-final-form';
import { FFInputText } from '../text/text';

type ExperimentProps = {
	name: string;
};

const SomeView: React.FC = () => {
	return (
		<>
			<hr />
			<Field name="monkey" component="input" />
			<FFInputText name="ffmonkey" />
			<hr />
		</>
	);
};

export const Experiment: React.FC<ExperimentProps> = ({}) => {
	return <SomeView />;
};
