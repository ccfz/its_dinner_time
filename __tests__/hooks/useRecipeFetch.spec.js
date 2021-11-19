import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react-hooks';
import useRecipeFetch from 'hooks/useRecipeFetch';

const REACT_APP_BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL
const mockedAxios = new MockAdapter(axios);
const sampleRecipes = [
  { id: 1, name: 'Chicken stew', ingredients: ['Chicken', 'Onions'] },
  { id: 2, name: 'Beef stew', ingredients: ['Beef', 'Red wine'] }
];

const spy = jest.spyOn(axios, 'get');
beforeEach(() => { spy.mockClear(); });

describe('useRecipeFetch', () => {
  it('returns recipes', async () => {
    mockedAxios.onGet(
      REACT_APP_BACKEND_API_URL + 'recipes/index'
    ).reply(200, sampleRecipes);

    const { result, waitForNextUpdate } = renderHook(() => useRecipeFetch());

    await act(async () => waitForNextUpdate());
    expect(result.current[0]).toEqual([
      { id: 1, name: 'Chicken stew', ingredients: ['Chicken', 'Onions'] },
      { id: 2, name: 'Beef stew', ingredients: ['Beef', 'Red wine'] }
    ]);
  });


  it('returns an empty array by default', async () => {
    mockedAxios.onGet(REACT_APP_BACKEND_API_URL + 'recipes/index').reply(200);

    const { result, waitForNextUpdate } = renderHook(() => useRecipeFetch());

    await act(async () => waitForNextUpdate());
    expect(result.current[0]).toEqual([]);
  });

  it('returns a function to query recipes', async () => {
    mockedAxios.onGet(REACT_APP_BACKEND_API_URL + 'recipes/index').reply(200);
    const { result, waitForNextUpdate } = renderHook(() => useRecipeFetch());
    const [recipes, fetchMore] = result.current;

    fetchMore('Tomato');

    await act(async () => waitForNextUpdate());
    expect(spy).toHaveBeenCalledWith(
      REACT_APP_BACKEND_API_URL + "recipes/index", {
        params: { query: 'Tomato' }
      }
    )
  })
});
