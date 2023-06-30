import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import AuthProvider, { AuthContext } from '.';
import Login from '../../components/Auth/Login';
import testUsers from '../../Context/Auth/lib/users';

const server = setupServer(
  rest.post('-/signin', (req, res, ctx) => {
    return res.once(ctx.json({ data: { user: testUsers['admin'] } }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Auth Context', () => {
  it.skip('Provides initial state', () => {
    render(
      <AuthProvider url='-'>
        <AuthContext.Consumer>
          {({ isLoggedIn, user }) => {
            return (
              <>
                <p data-testid='isLoggedIn'>{isLoggedIn.toString()}</p>
                <p data-testid='user'>{typeof user}</p>
              </>
            );
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    const loggedIn = screen.getByTestId('isLoggedIn');
    const username = screen.getByTestId('user');

    expect(loggedIn).toHaveTextContent('false');
    expect(username).toHaveTextContent('object');
  });

  it.skip('Provides log in function and state works', async () => {
    render(
      <AuthProvider url='-'>
        <AuthContext.Consumer>
          {({ isLoggedIn, user, can }) => {
            return (
              <>
                <Login />
                <p data-testid='isLoggedIn'>{isLoggedIn.toString()}</p>

                <p data-testid='capabilities'>{`${user.capabilities}`}</p>
              </>
            );
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');
    // mocking an event:  change of input
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'ADMIN' } });
    fireEvent.click(loginButton);

    expect(await screen.findByTestId('isLoggedIn')).toHaveTextContent('true');
    expect(await screen.findByTestId('capabilities')).toHaveTextContent(
      'create,update,read,delete'
    );
    /*    const logoutButton = screen.getByText('Log out')
    fireEvent.click(logoutButton)
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent(false)*/
  });
});
