import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Recipes from 'components/Recipes';
import useRecipeFetch from 'hooks/useRecipeFetch';

jest.mock('../../app/javascript/hooks/useRecipeFetch');
useRecipeFetch.mockReturnValue([[], jest.fn()])

describe('Recipes', () => {
  it('renders "ITS DINNER TIME" title', () => {
    render(<Recipes />);

    expect(screen.getByText('ITS DINNER TIME')).toBeTruthy();
  });

  it('renders an ingredients input with placeholder text', () => {
    render(<Recipes />);

    expect(
      screen.getByPlaceholderText('Tomato, Chicken, Pasta')
    ).toBeTruthy();
  });

  it('renders any received recipes with their title and ingredients', () => {
    useRecipeFetch.mockReturnValueOnce([
      [
        { id: 1, name: 'Chicken stew', ingredients: ['Chicken', 'Onions'] },
        { id: 2, name: 'Beef stew', ingredients: ['Beef', 'Red wine'] }
      ],
      jest.fn()
    ])

    render(<Recipes />);

    expect(screen.getByText('Chicken stew')).toBeTruthy();
    expect(screen.getByText('Chicken, Onions')).toBeTruthy();
    expect(screen.getByText('Beef stew')).toBeTruthy();
    expect(screen.getByText('Beef, Red wine')).toBeTruthy();
  });

  describe('when ingredients are entered in the query', () => {
    it('queries recipes with the entered value', () => {
      const mockQueryRecipes = jest.fn();
      useRecipeFetch.mockReturnValueOnce([
        [],
        mockQueryRecipes
      ])
      const utils = render(<Recipes />);
      const input = utils.getByLabelText('ingredients-input')
      fireEvent.change(input, {target: {value: 'Tomato'}})
      expect(input.value).toBe('Tomato');
      expect(mockQueryRecipes).toHaveBeenCalledWith('Tomato')
    })
  })
})