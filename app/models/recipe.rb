class Recipe < ApplicationRecord
  scope :filter_by_ingredients, ->(query) {
    prefixed_query = query.split.map { |query_item| "#{query_item}:*" }

    where("to_tsvector('french', ingredients)
    @@ to_tsquery('french', :q)", q: prefixed_query.join(" & "))
  }
end
