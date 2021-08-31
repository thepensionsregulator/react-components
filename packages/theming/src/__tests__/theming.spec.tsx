import { getBreakpoint } from '../theming'

describe('Theming', () => {
	
  test('check there is a getBreakpoint function', async () => {
    // Import would break anyway, but add an existence test
		expect(getBreakpoint).toBeTruthy();
	});

  test('expect empty string on unable to get a font size', async () => {
		expect(getBreakpoint()).toEqual('');
	});

});
