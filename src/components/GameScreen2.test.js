import { cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockRandom, resetMockRandom } from 'jest-mock-random';
import GameScreen from './GameScreen2';


describe('<GameScreen2 />', () => {
  const mockUsername = `some name`;
  const mockResetGame = jest.fn().mockName(`resetGame`);

  afterEach(() => {
    cleanup();
    resetMockRandom();
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
    mockRandom(0.1);

    const {
      getByRole,
      getByText
    } = render(<GameScreen username={mockUsername} onReset={mockResetGame}/>);
    userEvent.click(getByRole('button', {name: /rock/i}));
    
    getByText((`${mockUsername}: 0 v CPU: 0 - Tie: 1`));
  });

  test('updates score tally when user wins', () => {
    mockRandom(0.1);

    const {
      getByRole,
      getByText
    } = render(<GameScreen username={mockUsername} onReset={mockResetGame}/>);
    userEvent.click(getByRole('button', {name: /paper/i}));
    getByText(new RegExp(`${mockUsername}: 1 v cpu: 0 - tie: 0`, `i`));
  });

  test('updates score tally when user loses', () => {
    mockRandom(0.1);

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
    } = render(<GameScreen username={mockUsername} onReset={mockResetGame}/>);
    userEvent.click(getByRole('button', {name: 'Reset Game'}));
    expect(mockResetGame).toHaveBeenCalled();
  });

});