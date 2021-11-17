require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it 'has a valid factory' do
    recipe = build(:recipe)

    expect(recipe).to be_valid
  end
end
