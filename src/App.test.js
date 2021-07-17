import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// jest.mock("./components/WelcomeScreen", () => ({}) => {
//   const onPlayClickMock = jest.fn();
//   return(
//     <div data-testid="welcome-screen">
//       <form aria-label="user-name-form" onSubmit={onPlayClickMock}>
//       <label htmlFor="name">Name</label>
//         <input type="text" id="name" />
//         <button className="button" type="submit">
//           Play
//         </button>
//       </form>
//     </div>
//   )
// });
// jest.mock("./components/GameScreen", () => () => <div data-testid="game-screen"></div>);


describe('<App />', () => {

  test('renders starting with a welcome screen and a Play again button', () => {
    const {getByTestId} = render(<App />);
    getByTestId('welcome-screen');
  });

  test(`renders game screen when a name is updated`, () => {
    const {
      getByRole,
      getByLabelText,
      getByTestId
    } = render(<App />);
    const userName = `some name`;
    const form = getByRole('form', {name: /user-name-form/i});
    const input = getByLabelText(/^name$/i);
    fireEvent.change(input, { target: { value: userName } });
    expect(input).toHaveValue(userName);
    fireEvent.submit(form);
    expect(getByTestId('game-screen')).toBeInTheDocument();
  });
});