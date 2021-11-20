import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const useRecipeFetch = () => {
  const [recipes, setRecipes] = useState([]);
  const debouncedFetchRecipes = useRef(
    debounce(fetchRecipes, 300, { leading: false, trailing: true })
  );
  async function fetchRecipes(query) {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_API_URL + 'recipes/index',
      {
        params: query
      }
    );

    setRecipes(data || []);
  }
  useEffect(() => {
    fetchRecipes();
  }, []);

  return [recipes, debouncedFetchRecipes.current];
};

export default useRecipeFetch
