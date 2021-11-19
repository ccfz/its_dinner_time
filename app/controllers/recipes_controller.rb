class RecipesController < ApplicationController
  def index
    ingredients = filtering_params(params)
    recipes =
      if ingredients.present?
        Recipe.filter_by_ingredients(ingredients).limit(100)
      else
        Recipe.all.limit(100)
      end

    render json: recipes
  end

  def filtering_params(params)
    params[:ingredients]
  end
end
