import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';

expect.extend(toHaveNoViolations);

global.throwOnConsoleError = true;

global.console.error = (message) => {
  if (global.throwOnConsoleError)
    throw message
  else 
    global.console.warn(message);
}
