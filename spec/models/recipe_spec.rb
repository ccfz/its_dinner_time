require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it 'has a valid factory' do
    recipe = build(:recipe)

    expect(recipe).to be_valid
  end

  describe '.filter_by_ingredients' do
    it 'includes recipes, which includes the ingredients' do
      create(:recipe, name: 'Chicken stew', ingredients: %w[chicken onion])
      create(:recipe, name: 'Chicken noodles', ingredients: %w[chicken noodles])
      create(:recipe, name: 'Beef stew', ingredients: %w[beef onion tomato])

      recipes = Recipe.filter_by_ingredients("chicken")
      expect(recipes.count).to eq(2)
      expect(recipes).to include(
        having_attributes(name: 'Chicken stew'),
        having_attributes(name: 'Chicken noodles')
      )

      other_recipes = Recipe.filter_by_ingredients("onion beef tomato")
      expect(other_recipes.count).to eq(1)
      expect(other_recipes).to include(
        having_attributes(name: 'Beef stew')
      )
    end

    it 'searches recipes, case insensitive' do
      create(:recipe, name: 'Beef stew', ingredients: %w[beef onion])

      other_recipes = Recipe.filter_by_ingredients("onion bEEf")
      expect(other_recipes.count).to eq(1)
      expect(other_recipes).to include(
        having_attributes(name: 'Beef stew')
      )
    end

    it 'matches partial queries' do
      create(:recipe, name: 'Beef stew', ingredients: "123 beef, 56 onion")

      other_recipes = Recipe.filter_by_ingredients("onion be")
      expect(other_recipes.count).to eq(1)
      expect(other_recipes).to include(
        having_attributes(name: 'Beef stew')
      )
    end
  end
end
