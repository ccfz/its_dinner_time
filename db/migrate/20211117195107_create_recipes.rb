class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.timestamps
      t.string 'name'
      t.string 'steps'
      t.string 'image'
      t.string 'prep_time'
      t.string 'total_time'
      t.string 'author'
      t.string 'people_quantity'
      t.string 'cook_time'
      t.jsonb 'ingredients'
    end
  end
end
