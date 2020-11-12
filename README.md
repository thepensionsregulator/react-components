# TPR React Components

[build-badge]: https://circleci.com/gh/thepensionsregulator/react-components/tree/master.svg?style=svg
[license-badge]: https://img.shields.io/npm/l/react-components.svg?style=flat-square

![Build Status][build-badge]
![MIT License][license-badge]

> React Components is a design system for TPR

React components are maintained following a multi-package approach where
components are packaged and published individually, but combined under this
single repository.

## Installation

See the [CONTRIBUTING](./CONTRIBUTING.md)

| Package                            | Version                                                 | Size                                                     |
| ---------------------------------- | ------------------------------------------------------- | -------------------------------------------------------- |
| [`@tpr/core`](packages/core)       | [![npm version][core npm version]][core npm link]       | [![Bundle Size][core size bundle]][core size link]       |
| [`@tpr/forms`](packages/forms)     | [![npm version][forms npm version]][forms npm link]     | [![Bundle Size][forms size bundle]][forms size link]     |
| [`@tpr/icons`](packages/icons)     | [![npm version][icons npm version]][icons npm link]     | [![Bundle Size][icons size bundle]][icons size link]     |
| [`@tpr/layout`](packages/layout)   | [![npm version][layout npm version]][layout npm link]   | [![Bundle Size][layout size bundle]][layout size link]   |
| [`@tpr/theming`](packages/theming) | [![npm version][theming npm version]][theming npm link] | [![Bundle Size][theming size bundle]][theming size link] |

[core npm version]: https://flat.badgen.net/npm/v/@tpr/core
[core npm link]: https://www.npmjs.com/package/@tpr/core
[core size bundle]: https://flat.badgen.net/bundlephobia/minzip/@tpr/core
[core size link]: https://bundlephobia.com/result?p=@tpr/core
[forms npm version]: https://flat.badgen.net/npm/v/@tpr/forms
[forms npm link]: https://www.npmjs.com/package/@tpr/forms
[forms size bundle]: https://flat.badgen.net/bundlephobia/minzip/@tpr/forms
[forms size link]: https://bundlephobia.com/result?p=@tpr/forms
[icons npm version]: https://flat.badgen.net/npm/v/@tpr/icons
[icons npm link]: https://www.npmjs.com/package/@tpr/icons
[icons size bundle]: https://flat.badgen.net/bundlephobia/minzip/@tpr/icons
[icons size link]: https://bundlephobia.com/result?p=@tpr/icons
[layout npm version]: https://flat.badgen.net/npm/v/@tpr/layout
[layout npm link]: https://www.npmjs.com/package/@tpr/layout
[layout size bundle]: https://flat.badgen.net/bundlephobia/minzip/@tpr/layout
[layout size link]: https://bundlephobia.com/result?p=@tpr/layout
[theming npm version]: https://flat.badgen.net/npm/v/@tpr/theming
[theming npm link]: https://www.npmjs.com/package/@tpr/theming
[theming size bundle]: https://flat.badgen.net/bundlephobia/minzip/@tpr/theming
[theming size link]: https://bundlephobia.com/result?p=@tpr/theming

## Usage

React Components packages are ready to use in a
[Create React App](https://create-react-app.dev/) environment or together
with standard Rollup or webpack build configurations.

Here is a simple example to get you started:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '@tpr/theming';
import { Button } from '@tpr/core';

const App = () => {
	return (
		/* Include a ThemeProvider wrapper at the root of your app */
		<ThemeProvider>
			<Button>Example React button</Button>
		</ThemeProvider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Documentation

See TPR React Components [documentation website](https://tpr.netlify.com/)

## LICENSE

MIT
