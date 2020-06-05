# TPR Theming

React Components packages are ready to use in a
[Create React App](https://create-react-app.dev/) environment or together
with standard Rollup or webpack build configurations.

Here is a simple example how to get started:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider, { EditorFonts } from '@tpr/theming';
import { Button } from '@tpr/core';

const App = () => (
	/* Include a ThemeProvider wrapper at the root of your app or component to apply the styles */
	<ThemeProvider>
		<Button>Example React button</Button>
	</ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```
