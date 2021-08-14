import { render } from '@testing-library/react';
import {ScoreTally} from './ScoreTally';
import faker from 'faker';


describe('<ScoreTally />', () => {
  test('renders Game information', () => {
    const mockUsername = faker.name.findName();
    const mockUserScore = faker.datatype.number({min: 0, max: 100});
    const mockCPUScore = faker.datatype.number({min: 0, max: 100});
    const mockTieScore = faker.datatype.number({min: 0, max: 100});
    const {getByText} = render(<ScoreTally username={mockUsername} userScore={mockUserScore} CPUScore={mockCPUScore} tieScore={mockTieScore}/>);
    getByText(`${mockUsername}: ${mockUserScore} v CPU: ${mockCPUScore} - Tie: ${mockTieScore}`);
  });
});