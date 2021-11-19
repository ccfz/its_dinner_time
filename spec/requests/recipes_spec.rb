require 'rails_helper'

RSpec.describe "Recipes", type: :request do
  describe "GET /index" do
    it "returns an initial list of 100 recipes" do
      create_list(:recipe, 100)

      get '/recipes/index'

      parsed_body = JSON.parse(response.body)
      expect(parsed_body.length).to eq(100)
    end
  end

  describe "GET /index?query" do
    it "returns recipes that match the query" do
      create_list(:recipe, 30, ingredients: ['tomato'])
      create_list(:recipe, 20, ingredients: ['beef'])

      get '/recipes/index?ingredients=to'

      parsed_body = JSON.parse(response.body)
      expect(parsed_body.length).to eq(30)
    end
  end
end
