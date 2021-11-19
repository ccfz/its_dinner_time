import { useEffect, useState } from 'react';
import axios from 'axios';


const useRecipeFetch = () => {
  const [recipes, setRecipes] = useState([]);

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

  return [recipes, fetchRecipes];
};

export default useRecipeFetch
