class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.timestamps
      t.jsonb 'ingredients', null: false, default: '[]'
      t.string 'name'
    end
  end
end
