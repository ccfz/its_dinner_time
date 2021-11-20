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

  it('renders any received recipes with their title, ingredients'
    + 'prep time, cook time, quantity and author', () => {
    useRecipeFetch.mockReturnValueOnce([
      [
        {
          id: 1,
          name: 'Chicken stew',
          ingredients: ['Chicken', 'Onions'],
          author: 'Gandalf',
          prep_time: '60',
          cook_time: '40',
          people_quantity: '4',
          image: 'www.chicken_picture.com'
        }
      ],
      jest.fn()
    ])

    render(<Recipes />);


    expect(screen.getByText('Chicken stew')).toBeTruthy();
    expect(screen.getByText('Chicken, Onions')).toBeTruthy();
    expect(screen.getByText('Author: Gandalf')).toBeTruthy();
    expect(screen.getByText('Prep time: 60')).toBeTruthy();
    expect(screen.getByText('Cook time: 40')).toBeTruthy();
    expect(screen.getByText('Portions: 4')).toBeTruthy();
    const recipeImg = screen.getByRole('img');
    expect(recipeImg).toHaveAttribute('src', 'www.chicken_picture.com');
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
      expect(mockQueryRecipes).toHaveBeenCalledWith({ ingredients: "Tomato" })
    })
  })
})