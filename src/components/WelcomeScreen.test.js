import { render, fireEvent} from '@testing-library/react';
import WelcomeScreen from './WelcomeScreen';


describe('<WelcomeScreen />', () => {
  const onPlayMock = jest.fn(e=>e.preventDefault).mockName('onPlay');
  const setUsernameMock = jest.fn(e=>e.preventDefault).mockName('setUsername');

  test('renders Game information', () => {
    const {getByText} = render(<WelcomeScreen username={'some name'} setUsername={setUsernameMock} onPlay={onPlayMock}/>);
    getByText(`Rock Paper Scissors is a game where you choose a weapon and your opponent chooses a weapon. You can win by choosing the weapon that beats the opponent's weapon.`);
    getByText(`The computer will randomly choose a weapon for you and your opponent.`);
    getByText(`You can choose to play again by clicking the button below.`);
  });

  test('renders Welcome Form with user name input and a play button', () => {
    const {getByLabelText, getByRole} = render(<WelcomeScreen username={'some name'} setUsername={setUsernameMock} onPlay={onPlayMock}/>);
    getByLabelText(/^name$/i);
    const button = getByRole('button', {name: /play/i});
    expect(button).toHaveAttribute(`type`, `submit`);
  });

  test('clicking the play button calls the onPlay method', () => {
    const {getByRole}= render(<WelcomeScreen username={'some name'} setUsername={setUsernameMock} onPlay={onPlayMock}/>);
    const form = getByRole('form', {name: /user-name-form/i});
    fireEvent.submit(form);
    expect(onPlayMock).toHaveBeenCalledTimes(1);
  });

});