import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import SettingsProvider, { SettingsContext } from '.';

describe('Settings Context', () => {
  it('Provides initial state', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ title, defaultValues }) => {
            return (
              <>
                <h1>{title}</h1>
                <p>{defaultValues.difficulty}</p>
              </>
            );
          }}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const title = screen.getByText('Home');
    const difficulty = screen.getByText(4);

    expect(title).toBeInTheDocument();
    expect(difficulty).toBeInTheDocument();
  });
});
