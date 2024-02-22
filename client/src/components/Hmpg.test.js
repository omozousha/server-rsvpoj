import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hmpg from './Hmpg';

test('renders navigation links', () => {
  render(
    <Router>
      <Hmpg />
    </Router>
  );

  const section1Link = screen.getByText(/section 1/i);
  const section2Link = screen.getByText(/section 2/i);
  const section3Link = screen.getByText(/section 3/i);
  const section4Link = screen.getByText(/section 4/i);

  expect(section1Link).toBeInTheDocument();
  expect(section2Link).toBeInTheDocument();
  expect(section3Link).toBeInTheDocument();
  expect(section4Link).toBeInTheDocument();
});

test('renders correct component based on route', () => {
  render(
    <Router initialEntries={['/section1']}>
      <Hmpg />
    </Router>
  );

  const section1Component = screen.getByTestId('section1-component');
  expect(section1Component).toBeInTheDocument();

  const section2Component = screen.queryByTestId('section2-component');
  expect(section2Component).not.toBeInTheDocument();
});