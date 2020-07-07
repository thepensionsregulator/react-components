import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import {
	Sidebar,
	SidebarSectionProps,
	calculateProgress,
} from '../sidebar/sidebar';
import { axe } from 'jest-axe';

const s1: SidebarSectionProps = {
	title: 'Scheme details',
	links: [
		{
			name: 'Scheme name and address',
			completed: true,
			onClick: (link) => console.log(`You clicked on ${link.name}`),
		},
		{
			name: 'Scheme status and membership',
			onClick: (link) => console.log(`You clicked on ${link.name}`),
		},
		{
			name: 'Consent to electronic comunication',
			onClick: (link) => console.log(`You clicked on ${link.name}`),
		},
	],
	order: 1,
};
const s2: SidebarSectionProps = {
	title: 'Roles',
	links: [
		{ name: 'Trustee details', completed: true, active: true },
		{ name: 'Employer details' },
		{ name: 'Service provider details' },
		{ name: 'Named contact details', completed: true },
	],
	order: 2,
};
const s3: SidebarSectionProps = {
	title: 'Finish up',
	links: [{ name: 'Review and submit', completed: false, disabled: true }],
	order: 3,
};

const sections = [s1, s2, s3];

describe('Sidebar', () => {
	test('Sidebar is accessible', async () => {
		const { container } = render(
			<Sidebar title="Scheme return home" sections={sections} />,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Sidebar renders title', () => {
		const title = 'Scheme return home';
		const { getByText } = render(<Sidebar title={title} sections={sections} />);
		expect(getByText(title)).toBeInTheDocument();
		expect(true).toBeTruthy();
	});

	test('Sidebar calculates and displays progress correctly', () => {
		const title = 'Scheme return home';
		const { getByText } = render(<Sidebar title={title} sections={sections} />);
		// debug();
		const progressText = getByText((content) => content.startsWith('Progress'));
		const [currentProgress, totalProgress] = progressText.textContent
			.split(' ')
			.map((value) => parseInt(value))
			.filter(Boolean);

		const [totalSections, totalCompleted] = calculateProgress(sections);

		expect(currentProgress).toEqual(totalCompleted.length);
		expect(totalProgress).toEqual(totalSections.length);
	});
});
