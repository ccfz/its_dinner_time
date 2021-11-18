require 'rails_helper'

RSpec.describe "Recipes", type: :request do
  describe "GET /index" do
    it "returns an initial list of 20 recipes" do
      create_list(:recipe, 120)

      get '/recipes/index'

      parsed_body = JSON.parse(response.body)
      expect(parsed_body.length).to eq(100)
    end
  end
end
