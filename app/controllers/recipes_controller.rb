class RecipesController < ApplicationController
  def index
    recipes = Recipe.all.limit(100)

    render json: recipes
  end
end
