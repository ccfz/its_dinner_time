namespace :recipes do
  desc 'Populates db with recipes'
  task populate: :environment do
    recipes = []
    File.open('./recipes.json').each { |recipe|
      recipes << JSON.parse(recipe)
    }

    ActiveRecord::Base.transaction do
      recipes.each do |recipe|
        Recipe.create!(name: recipe['name'], ingredients: recipe['ingredients'])
      end
    end
  end
end
