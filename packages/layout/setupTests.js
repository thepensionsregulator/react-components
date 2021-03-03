import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';

expect.extend(toHaveNoViolations);

global.console.error = (message) => {
  throw message
}
