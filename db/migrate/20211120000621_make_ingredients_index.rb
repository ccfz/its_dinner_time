class MakeIngredientsIndex < ActiveRecord::Migration[6.0]
  def change
    add_index :recipes, "to_tsvector('french', ingredients)", using: :gin
  end
end
