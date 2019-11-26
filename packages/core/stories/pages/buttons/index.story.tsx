import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

function Demo({ onSelectAll }) {
  return <div>kobra 11</div>;
}

storiesOf('buttons', module).add('Demo', () => <Demo onSelectAll={action('onSelectAll')} />);
