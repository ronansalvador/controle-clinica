import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste da pagina de Login', () => {
  test('Se o título esta na página', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {level: 1, name: /Login/i})
    expect(title).toBeInTheDocument();

    const user = screen.getByRole('heading', {level: 2, name: /Ronan/i})
    expect(user).toBeInTheDocument();
  });

  test('teste Paginda Teste', () => {
    renderWithRouter(<App />, { route: '/teste' });

    const title = screen.getByRole('heading', {level: 3, name: /teste/i})
    expect(title).toBeInTheDocument();

    // screen.logTestingPlaygroundURL();
  });

});
