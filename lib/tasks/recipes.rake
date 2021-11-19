namespace :recipes do
  desc 'Populates db with recipes'
  task populate: :environment do
    recipes = []
    File.open('./recipes.json').each { |recipe|
      recipes << JSON.parse(recipe)
    }

    ActiveRecord::Base.transaction do
      recipes.each do |recipe|
        Recipe.create!(
          name: recipe['name'],
          steps: recipe['steps'],
          image: recipe['image'],
          prep_time: recipe['prep_time'],
          total_time: recipe['total_time'],
          author: recipe['author'],
          people_quantity: recipe['people_quantity'],
          cook_time: recipe['cook_time'],
          ingredients: recipe['ingredients']
        )
      end
    end
  end
end
