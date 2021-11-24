class Recipe < ApplicationRecord
  scope :filter_by_ingredients, ->(query) {
    prefixed_query = query.split.map { |query_item| "#{query_item}:*" }
    sanitized_query = ActiveRecord::Base.connection.quote(
      prefixed_query.join(" | ")
    )

    where("to_tsvector('french', ingredients)
    @@ to_tsquery('french', #{sanitized_query})")
      .order(Arel.sql("ts_rank(
        to_tsvector('french', ingredients),
        to_tsquery('french', #{sanitized_query})
      ) DESC"))
      .order("JSONB_ARRAY_LENGTH(ingredients) ASC")
  }
end
