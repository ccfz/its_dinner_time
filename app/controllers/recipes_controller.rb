class RecipesController < ApplicationController
  def index
    recipes = Recipe.all.limit(20)

    render json: recipes
  end
end
