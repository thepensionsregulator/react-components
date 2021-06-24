import { Dispatch, SetStateAction } from 'react';

export type SubmitButtonProps = {
	text: string;
};

export interface SubmitFormProps {
	setSubmitForm: Dispatch<SetStateAction<boolean>>;
}
