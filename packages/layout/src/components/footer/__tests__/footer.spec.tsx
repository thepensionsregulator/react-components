import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Footer } from '../';

describe('Footer', () => {
  test('it renders correctly', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('footer')).toBeInTheDocument();
  });
});
