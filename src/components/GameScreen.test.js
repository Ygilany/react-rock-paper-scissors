import { render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameScreen from './GameScreen';
const mathRandomSpy = jest.spyOn(Math, `random`);


describe('<GameScreen />', () => {
  const mockUsername = `some name`;

  test('renders correctly', () => {
    const {
      getByText, 
      getByRole, 
      getByLabelText
    } = render(<GameScreen username={mockUsername}/>);
    // Welcome
    getByText(new RegExp(`welcome to the game, ${mockUsername}`, `i`));
    // Score Tally
    getByText(new RegExp(`${mockUsername}: 0 v CPU: 0 - Tie: 0`, `i`));
    // Game Input
    getByLabelText(/select your choice/i);
    getByRole('button', {name: /go/i});
    // Reset Button
    getByRole('button', {name: /reset game/i});
  });

  test('updates score tally when tie', () => {
    mathRandomSpy.mockImplementationOnce(() => 0.1);

    const {
      getByLabelText,
      getByRole,
      getByText
    } = render(<GameScreen username={mockUsername} />);
    const select = getByLabelText(/select your choice/i);
    userEvent.selectOptions(select, ['rock']);
    userEvent.click(getByRole('button', {name: /go/i}));
    getByText(`${mockUsername}: 0 v CPU: 0 - Tie: 1`);
  });

  test('updates score tally when user wins', () => {
    mathRandomSpy.mockImplementationOnce(() => 0.1);

    const {
      getByLabelText,
      getByRole,
      getByText
    } = render(<GameScreen username={mockUsername} />);
    const select = getByLabelText(/select your choice/i);
    userEvent.selectOptions(select, ['paper']);
    userEvent.click(getByRole('button', {name: /go/i}));
    getByText(`${mockUsername}: 1 v CPU: 0 - Tie: 0`);
  });

  test('updates score tally when user loses', () => {
    mathRandomSpy.mockImplementationOnce(() => 0.1);

    const {
      getByLabelText,
      getByRole,
      getByText
    } = render(<GameScreen username={mockUsername} />);
    const select = getByLabelText(/select your choice/i);
    userEvent.selectOptions(select, ['scissors']);
    userEvent.click(getByRole('button', {name: /go/i}));
    getByText(`${mockUsername}: 0 v CPU: 1 - Tie: 0`);
  });

});