require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it 'has a valid factory' do
    recipe = build(:recipe)

    expect(recipe).to be_valid
  end

  describe '.filter_by_ingredients' do
    it 'includes recipes, which includes any of the ingredients' do
      create(:recipe, name: 'Chicken stew', ingredients: %w[chicken onion])
      create(:recipe, name: 'Pork noodles', ingredients: %w[Pork noodles])
      create(:recipe, name: 'Beef stew', ingredients: %w[beef onion tomato])

      recipes = Recipe.filter_by_ingredients("chicken tomato")
      expect(recipes.count).to eq(2)
      expect(recipes).to include(
        having_attributes(name: 'Chicken stew'),
        having_attributes(name: 'Beef stew')
      )

      other_recipes = Recipe.filter_by_ingredients("pork noodles")
      expect(other_recipes.count).to eq(1)
      expect(other_recipes).to include(
        having_attributes(name: 'Pork noodles')
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
      create(:recipe, name: 'Beef stew', ingredients: ['123 beef', '56 onion'])

      other_recipes = Recipe.filter_by_ingredients("onion be")
      expect(other_recipes.size).to eq(1)
      expect(other_recipes).to include(
        having_attributes(name: 'Beef stew')
      )
    end

    describe 'recipe ordering' do
      it 'ranks recipes matching the most ingredients highest' do
        create(:recipe, name: 'Beef stew', ingredients: %w[beef onion tomato])
        create(:recipe, name: 'Pork noodles', ingredients: %w[Pork noodles])
        create(:recipe, name: 'Chicken stew', ingredients: %w[chicken onion])

        recipes = Recipe.filter_by_ingredients("chicken onion")

        expect(recipes.size).to eq(2)
        expect(recipes[0]).to have_attributes(name: 'Chicken stew')
        expect(recipes[1]).to have_attributes(name: 'Beef stew')
      end

      context "when two recipes rank the same" do
        it 'orders them by number of ingredients' do
          create(:recipe, name: 'Beef stew', ingredients: %w[beef onion tomato])
          create(:recipe, name: 'Pork noodles',
                          ingredients: %w[Pork onion noodles ginger])
          create(:recipe, name: 'Chicken stew', ingredients: %w[chicken onion])

          recipes = Recipe.filter_by_ingredients("onion")

          expect(recipes[0]).to have_attributes(name: 'Chicken stew')
          expect(recipes[1]).to have_attributes(name: 'Beef stew')
          expect(recipes[2]).to have_attributes(name: 'Pork noodles')
        end
      end
    end
  end
end
