import { assign } from 'xstate';

export const updateClickedButton = (btn: number) => {
	return assign((__, _) => ({
		lastBtnClicked: btn,
	}));
};

export const returnToPreview = (btnClicked: number) => {
	return {
		target: '#preview',
		actions: updateClickedButton(btnClicked),
	};
};