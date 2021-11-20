import React, { useState } from 'react';

import useRecipeFetch from '../hooks/useRecipeFetch';
const Recipes = () => {
  const [recipes, queryRecipes] = useRecipeFetch();
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
    queryRecipes({ ingredients: e.target.value })
  }

  const styles = {
    titleContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    image: {
      height: 100,
      width: 'auto',
      marginLeft: 10
    },
    listContainer: {
      margin: 0,
      padding: 5,
      listStyleType: 'none'
    },
    recipeContainer: {
      width: '30%'
    },
    recipeList: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: '100%'
    },
    queryInput: {
      fontSize: 24,
      padding: 5
    }
  }

  return (
    <div>
      <h1>ITS DINNER TIME</h1>
      <input
        style={styles.queryInput}
        value={value}
        onChange={handleChange}
        aria-label="ingredients-input"
        placeholder="Tomato, Chicken, Pasta"
      />
      <div style={styles.recipeList}>
      {recipes.map(recipe => {
        return (
          <div key={recipe.id} style={styles.recipeContainer}>
            <h3>{recipe.name}</h3>
            <div style={styles.titleContainer}>
              <ul style={styles.listContainer}>
                <li>{`Author: ${recipe.author}`}</li>
                <li>{`Prep time: ${recipe.prep_time}`}</li>
                <li>{`Cook time: ${recipe.cook_time}`}</li>
                <li>{`Portions: ${recipe.people_quantity}`}</li>
              </ul>
              <img style={styles.image} src={recipe.image} />
            </div>
            <p>{recipe.ingredients.join(', ')}</p>
          </div>
        )
      })}
      </div>
    </div >
  )
}

export default Recipes;
