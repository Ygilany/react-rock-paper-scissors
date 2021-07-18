import { cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameScreen from './GameScreen2';
const mathRandomSpy = jest.spyOn(Math, `random`);


describe('<GameScreen2a />', () => {
  const mockUsername = `some name`;
  const mockResetGame = jest.fn().mockName(`resetGame`);

  afterEach(() => {
    cleanup();
    mathRandomSpy.mockReset();
  });

  test('renders correctly', () => {
    const {
      getByText, 
      getByRole, 
    } = render(<GameScreen username={mockUsername} onReset={mockResetGame}/>);
    // Welcome
    getByText(new RegExp(`welcome to the game, ${mockUsername}`, `i`));
    // Score Tally
    getByText(new RegExp(`${mockUsername}: 0 v CPU: 0 - Tie: 0`, `i`));
    // Game Input
    getByRole('button', {name: /rock/i});
    getByRole('button', {name: /paper/i});
    getByRole('button', {name: /scissors/i});
    // Reset Button
    getByRole('button', {name: /reset game/i});
  });

  test('updates score tally when tie', () => {
    mathRandomSpy.mockImplementationOnce(() => 0.1);

    const {
      getByRole,
      getByText
    } = render(<GameScreen username={mockUsername} onReset={mockResetGame}/>);
    userEvent.click(getByRole('button', {name: /rock/i}));
    getByText(`${mockUsername}: 0 v CPU: 0 - Tie: 1`);
  });

  test('updates score tally when user wins', () => {
    mathRandomSpy.mockImplementationOnce(() => 0.1);

    const {
      getByRole,
      getByText
    } = render(<GameScreen username={mockUsername} onReset={mockResetGame}/>);
    userEvent.click(getByRole('button', {name: /paper/i}));
    getByText(`${mockUsername}: 1 v CPU: 0 - Tie: 0`);
  });

  test('updates score tally when user loses', () => {
    mathRandomSpy.mockImplementationOnce(() => 0.1);

    const {
      getByRole,
      getByText
    } = render(<GameScreen username={mockUsername} onReset={mockResetGame}/>);
    userEvent.click(getByRole('button', {name: /scissors/i}));
    getByText(`${mockUsername}: 0 v CPU: 1 - Tie: 0`);
  });

  test('resets game when reset button is clicked', () => {
    const {
      getByRole,
      debug
    } = render(<GameScreen username={mockUsername} onReset={mockResetGame}/>);
    debug();
    // userEvent.click(getByRole('button', {name: 'Reset Game'}));
    // expect(mockResetGame).toHaveBeenCalled();
  });

});