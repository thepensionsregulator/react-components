import { ActuaryI18nProps } from '@tpr/core';

export const i18n: ActuaryI18nProps = {
	preview: {
		buttons: {
			one: 'Actuary',
			two: 'Remove',
			three: 'Address',
			four: 'Contact details',
		},
		checkboxLabel: 'All details are correct.',
	},
	name: {
		title: 'Name of Actuary',
		fields: {
			title: {
				label: 'Title',
			},
			firstName: {
				label: 'First name',
				error: 'field is required',
			},
			lastName: {
				label: 'Last name',
				error: 'field is required',
			},
		},
	},
	contacts: {
		title: 'Contact details for this actuary',
		subtitle: 'Provide contact details for the actuary.',
		fields: {
			telephone: {
				label: 'Telephone number',
				error:
					'Enter a telephone number, like 0163 960 598 or +44 7700 900 359',
			},
			email: {
				label: 'Email address',
				error: 'Cannot be empty',
			},
		},
	},
	remove: {
		confirm: {
			breadcrumbs: {
				link1: 'Remove this actuary',
				link2: 'Are you sure...?',
			},
			title: 'Are you sure you want to remove this actuary?',
			dialog: {
				message1: "This can't be undone.",
			},
			buttons: {
				remove: 'Remove actuary',
				cancel: 'Cancel',
			},
		},
		date: {
			title: 'Remove this actuary',
			fields: {
				confirm: {
					label:
						'I confirm this actuary is no longer associated with the scheme.',
				},
				date: {
					label: 'Date the actuary left the scheme',
					hint: 'For example, 31 3 2019',
					error: 'Cannot be left empty!',
				},
			},
			errors: {
				formIncomplete: 'Please confirm and fill in the date fields.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the Employer was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
